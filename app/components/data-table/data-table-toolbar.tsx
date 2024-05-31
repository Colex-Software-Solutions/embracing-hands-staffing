"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableToolbarInput, DataTableToolbarOption } from "./data-table";

interface DataTableToolbarProps<TData> {
  dataTableToolbarOptions: DataTableToolbarOption[];
  dataTableToolbarInputs: DataTableToolbarInput[];
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  dataTableToolbarInputs,
  dataTableToolbarOptions,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {dataTableToolbarInputs.map(
          (dataTableToolbarInput) =>
            table.getColumn(dataTableToolbarInput.column) && (
              <Input
                placeholder={dataTableToolbarInput.placeholder}
                value={
                  (table
                    .getColumn(dataTableToolbarInput.column)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(dataTableToolbarInput.column)
                    ?.setFilterValue(event.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
              />
            )
        )}
        {dataTableToolbarOptions &&
          dataTableToolbarOptions.map(
            (dataTableToolbarOption) =>
              table.getColumn(dataTableToolbarOption.column) && (
                <DataTableFacetedFilter
                  column={table.getColumn(dataTableToolbarOption.column)}
                  title={dataTableToolbarOption.column}
                  options={dataTableToolbarOption.options}
                />
              )
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
