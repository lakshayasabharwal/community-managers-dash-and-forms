"use client";

import { useState, useEffect } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format, parseISO, differenceInMinutes, endOfDay } from "date-fns";

import axios from "axios";

// Function to format timestamp to "HH:mm dd/mm/yyyy"
const formatTimestamp = (timestamp) => {
    if (!timestamp) {
        return "";
    }
    try {
        return format(parseISO(timestamp), "HH:mm dd/MM/yyyy");
    } catch (error) {
        console.error(error);
        return "";
    }
};

// Function to calculate remaining SLA time in hours and minutes
const calculateRemainingSLA = (timestamp) => {
    try {
        const timestampDate = parseISO(timestamp);
        const now = new Date();
        const endOfDayTime = new Date(timestampDate.getTime() + 86400000);      //24 hours added to calculate SLA deadline

        if (now > endOfDayTime) {
            return "00:00";
        }

        const minutesRemaining = differenceInMinutes(endOfDayTime, now);
        const hoursRemaining = Math.floor(minutesRemaining / 60);
        const remainingMinutes = minutesRemaining % 60;

        return `${String(hoursRemaining)} hrs ${String(remainingMinutes).padStart(2, '0')} mins`;
    } catch (error) {
        console.error("error calculating SLA", error);
        return "";
    }

};

const columns = [
    {
        accessorKey: "isDone",
        header: "Select",
        cell: ({ row, table }) => (
            <Checkbox
                checked={row.getValue("isDone")}
                onCheckedChange={async (value) => {
                    try {
                        const rowData = row.original;
                        const url =
                            rowData.type === "requirement"
                                ? `http://localhost:3001/requirements/${rowData.id}`
                                : `http://localhost:3001/complaints/${rowData.id}`;
                        const payload = rowData.type === "requirement"
                            ? { isHandled: !!value }
                            : { isHandled: !!value };

                        // Make the Axios request to update the isDone property
                        await axios.patch(url, payload);
                        console.log('data updated')
                        // Update the local state only if the request is successful
                        const updatedData = table.options.data.map((d, index) =>
                            index === row.index ? { ...d, isDone: !!value } : d
                        );
                        //table.setData(updatedData);
                    } catch (error) {
                        console.error('Failed to update isDone property:', error);
                    }
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => {
            const url = `/admin/${row.getValue("type")}/${row.original.company}`
            return (
                <Link href={url}>
                    <div className="font-semibold text-gray-800 flex items-center gap-2 hover:text-blue-500">
                        {row.getValue("company")}
                    </div>
                </Link>
            )

        },
    },
    {
        accessorKey: "timestamp",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Timestamp
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm text-gray-500">{formatTimestamp(row.getValue("timestamp"))}</div>
        ),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className={row.getValue("type") === "complaint" ? "text-sm font-normal w-fit px-2 py-0 rounded-md opacity-80 text-white bg-red-700" : "text-sm font-normal w-fit px-2 py-0 opacity-80 rounded-md text-white bg-yellow-700"}>{row.getValue("type")}</div>
        ),
    },
    {
        accessorKey: "sla",
        header: "SLA",
        cell: ({ row }) => (
            <div className="text-sm text-gray-500">
                {calculateRemainingSLA(row.getValue("timestamp"))}
            </div>
        ),
    },
];

function DataTable() {
    const [data, setData] = useState([]);
    const [requirementData, setRequirementData] = useState([]);
    const [complaintData, setComplaintData] = useState([]);

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick((tick) => tick + 1);
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const getComplaints = async () => {
            try {
                const response = await axios.get("http://localhost:3001/complaints");
                const complaintsResponseData = response.data.map((complaint) => ({
                    ...complaint,
                    type: "complaint"
                }));
                console.log(complaintsResponseData)
                setComplaintData(complaintsResponseData)
                // setData((prevData) => [...prevData, ...complaintsResponseData]);
            } catch (error) {
                console.error(error);
            }
        };

        const getRequirements = async () => {
            try {
                const response = await axios.get("http://localhost:3001/requirements");
                const requirementResponseData = response.data.map((requirement) => ({
                    ...requirement,
                    type: "requirement"
                }));
                console.log(requirementResponseData)
                setRequirementData(requirementResponseData)
                // setData((prevData) => [...prevData, ...requirementResponseData]);
            } catch (error) {
                console.error(error);
            }
        };
        getRequirements();
        getComplaints();

        return () => { };
    }, []);

    useEffect(() => {
        if (requirementData.length > 0 && complaintData.length > 0) {
            setData([...requirementData, ...complaintData]);
        }
    }, [requirementData, complaintData]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        setData,
    });

    const handleTypeFilterChange = (value) => {
        if (value === "all") {
            table.setColumnFilters([]);
        } else {
            table.setColumnFilters([{ id: "type", value }]);
        }
    };

    return (
        <div className="w-full p-5 background_color min-h-screen font_lato">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter company names..."
                    value={(table.getColumn("company")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("company")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm shadow-sm"
                />

                <Select onValueChange={handleTypeFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="requirement">Requirement</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border bg-white shadow-sm">
                <Table className="">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="bg-gray-950 text-gray-100 font-semibold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                { ...cell.getContext(), table }
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between py-2">
                <Button
                    variant="outline"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <span>
                    Page{' '}
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>
                <Button
                    variant="outline"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default DataTable;
