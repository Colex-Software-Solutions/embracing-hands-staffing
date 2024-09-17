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
  staffProfiles: StaffProfile[];
}

const StaffCombobox: React.FC<StaffComboboxProps> = ({
  value,
  onChange,
  staffProfiles,
}) => {
  const [open, setOpen] = React.useState(false);

  const staffs = staffProfiles.map((staffProfile) => {
    return {
      value: `${staffProfile.firstname} ${staffProfile.lastname}`.toLowerCase(),
      label: `${staffProfile.firstname} ${staffProfile.lastname}`,
    };
  });

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
            ? staffs.find((staff) => staff.value === value)?.label
            : "Select staff..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search staff..." />
          <CommandList>
            <CommandEmpty>No staff found.</CommandEmpty>
            <CommandGroup>
              {staffs.map((staff) => (
                <CommandItem
                  key={staff.value}
                  value={staff.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === staff.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {staff.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StaffCombobox;
