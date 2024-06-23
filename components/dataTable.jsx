"use client";

import { useState } from "react";
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


// Function to calculate remaining SLA time in hours
const calculateRemainingSLA = (timestamp) => {
    // Implementation
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
            <div className="text-sm text-gray-500">{row.getValue("timestamp")}</div>
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

function DataTable({ initialData }) {
    const [data, setData] = useState(initialData);
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

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

    return (
        <div className="w-full p-5 background_color min-h-screen font_lato">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter company names..."
                    value={(table.getColumn("companyName")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("companyName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm shadow-sm"
                />
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
