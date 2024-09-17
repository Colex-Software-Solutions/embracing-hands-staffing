"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { StaffProfile } from "@prisma/client";

interface StaffComboboxProps {
  value: string;
  onChange: (value: string) => void;
  staffProfiles: any[];
}

const StaffCombobox: React.FC<StaffComboboxProps> = ({
  value,
  onChange,
  staffProfiles,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredStaff = staffProfiles.filter(
    (staff) =>
      staff.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? (() => {
                const staff = staffProfiles.find(
                  (staffValue) => staffValue.id === value
                );
                return staff
                  ? `${staff.firstname} ${staff.lastname}`
                  : "Pick staff";
              })()
            : "Pick staff"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Filter staff..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {filteredStaff.length > 0 ? (
              <CommandGroup>
                {filteredStaff.map((staffProfileWrapper) => (
                  <CommandItem
                    key={staffProfileWrapper.id}
                    value={staffProfileWrapper.id}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === staffProfileWrapper.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {`${staffProfileWrapper.firstname} ${staffProfileWrapper.lastname}`}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No staff found.</CommandEmpty>
            )}
          </CommandList>{" "}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StaffCombobox;
