"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { ColumnFilter, Table } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableToolbarInput, DataTableToolbarOption } from "./data-table";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface DataTableToolbarProps<TData> {
  dataTableToolbarOptions: DataTableToolbarOption[];
  dataTableToolbarInputs: DataTableToolbarInput[];
  table: Table<TData>;
  handlePagination: (
    pageSize: number,
    page: number,
    increment?: boolean,
    filters?: ColumnFilter[]
  ) => void;
}

export function DataTableToolbar<TData>({
  table,
  dataTableToolbarInputs,
  dataTableToolbarOptions,
  handlePagination,
}: DataTableToolbarProps<TData>) {
  const columnFilters = table.getState().columnFilters;
  const isFiltered = columnFilters.length > 0;
  const [filters, setFilters] = useState<ColumnFilter[]>([]);

  const debouncedSetFilterValue = useDebouncedCallback((column) => {
    table.getColumn(column)?.setFilterValue(findFilterValueByColumn(column));
    handlePagination(table.getState().pagination.pageSize, 1, false, filters);
  }, 800);

  const findFilterValueByColumn = (column: string): string => {
    for (let filter of filters) {
      if (filter.id === column) {
        return filter.value as string;
      }
    }

    return "";
  };

  const updateFilterValueByColumn = (column: string, value: string) => {
    const currentFilter = filters.find((filter) => filter.id === column);

    if (!currentFilter) {
      setFilters((prev) => [
        ...prev,
        {
          id: column,
          value,
        },
      ]);

      return;
    }

    const newFilters = filters.map((filter) => {
      if (filter.id === column) {
        return {
          ...filter,
          value,
        };
      }

      return filter;
    });

    setFilters(newFilters);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {dataTableToolbarInputs.map((dataTableToolbarInput, index) => {
          return (
            table.getColumn(dataTableToolbarInput.column) && (
              <Input
                key={`dataTableToolbarInput-${index}`}
                placeholder={dataTableToolbarInput.placeholder}
                value={
                  findFilterValueByColumn(dataTableToolbarInput.column) || ""
                }
                onChange={(event) => {
                  debouncedSetFilterValue(dataTableToolbarInput.column);
                  updateFilterValueByColumn(
                    dataTableToolbarInput.column,
                    event.target.value
                  );
                }}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            )
          );
        })}
        {dataTableToolbarOptions &&
          dataTableToolbarOptions.map(
            (dataTableToolbarOption, index) =>
              table.getColumn(dataTableToolbarOption.column) && (
                <DataTableFacetedFilter
                  key={`dataTableToolbarInput-${index}`}
                  column={table.getColumn(dataTableToolbarOption.column)}
                  title={dataTableToolbarOption.column}
                  options={dataTableToolbarOption.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setFilters([]);
              handlePagination(
                table.getState().pagination.pageSize,
                1,
                false,
                []
              );
              table.resetColumnFilters();
            }}
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
