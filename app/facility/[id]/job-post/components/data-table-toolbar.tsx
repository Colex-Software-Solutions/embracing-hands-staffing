"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { Shift } from "../../applications/jobPost/[jobPostId]/page";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  jobPostId: string;
  handleAddShift: (newShift: Shift) => void;
}

export function DataTableToolbar<TData>({
  table,
  jobPostId,
  handleAddShift,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("id") && (
          <Input
            placeholder="Filter by Name..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        jobPostId={jobPostId}
        handleAddShift={handleAddShift}
      />
    </div>
  );
}
