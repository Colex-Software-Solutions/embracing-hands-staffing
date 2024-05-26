"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { paidOptions } from "../data/schema";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("facilityName") && (
          <Input
            placeholder="Filter by Facility..."
            value={
              (table.getColumn("facilityName")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("facilityName")
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn("jobPostTitle") && (
          <Input
            placeholder="Filter by Job Title..."
            value={
              (table.getColumn("jobPostTitle")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("jobPostTitle")
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn("paidStr") && (
          <DataTableFacetedFilter
            column={table.getColumn("paidStr")}
            title="Paid"
            options={paidOptions}
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
      <DataTableViewOptions table={table} />
    </div>
  );
}
