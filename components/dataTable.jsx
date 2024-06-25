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
    return format(parseISO(timestamp), "HH:mm dd/MM/yyyy");
};

// Function to calculate remaining SLA time in hours and minutes
const calculateRemainingSLA = (timestamp) => {
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
};

const columns = [
    {
        accessorKey: "isDone",
        header: "Select",
        cell: ({ row, table }) => (
            <Checkbox
                checked={row.getValue("isDone")}
                onCheckedChange={(value) => {
                    const updatedData = table.options.data.map((d, index) =>
                        index === row.index ? { ...d, isDone: !!value } : d
                    );
                    table.setData(updatedData);
                }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => (
            <div className="font-semibold text-gray-800 flex items-center gap-2">
                {row.getValue("companyName")}
            </div>
        ),
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
        header: "SLA (hrs)",
        cell: ({ row }) => (
            <div className="text-sm text-gray-500">
                {calculateRemainingSLA(row.getValue("timestamp"))}
            </div>
        ),
    },
];

function DataTable() {
    const [data, setData] = useState([
        {
            isDone: false,
            companyName: "Company A",
            timestamp: "2024-06-23T16:00:00Z",
            type: "complaint",
          },
          {
            isDone: true,
            companyName: "Company B",
            timestamp: "2024-06-20T12:00:00Z",
            type: "requirement",
          },
          {
            isDone: false,
            companyName: "Company C",
            timestamp: "2024-06-20T12:00:00Z",
            type: "requirement",
          }
    ]);

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [, setTick] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setTick((tick) => tick + 1);
        }, 60000); // Update every minute

        const getComplaints = async() => {
            try {
                const response = await axios.get('http://localhost:3001/complaints');
                const complaintsData = response.data;
                console.log(complaintsData);
                //setData(prevData => [...prevData, ...complaintsData]);

            } catch (error) {
                console.error(error)
            }
        }

        const getRequirements = async() => {
            try {
                const response = await axios.get('http://localhost:3001/requirements');
                const requirementsData = response.data;
                console.log(requirementsData);
                //setData(prevData => [...prevData, ...requirementsData]);

            } catch (error) {
                console.error(error)
            }
        }

        getComplaints();
        getRequirements();

        return () => clearInterval(interval);
    }, []);

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
                    value={(table.getColumn("companyName")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("companyName")?.setFilterValue(event.target.value)
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
