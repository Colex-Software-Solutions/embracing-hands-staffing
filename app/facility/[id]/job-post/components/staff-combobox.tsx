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
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import useStaff from "@/lib/hooks/useStaff";
import { useParams } from "next/navigation";

interface StaffComboboxProps {
  value: string;
  onChange: (value: string) => void;
  jobPostId: string;
}

const StaffCombobox: React.FC<StaffComboboxProps> = ({
  value,
  onChange,
  jobPostId,
}) => {
  const [open, setOpen] = React.useState(false);
  const { fetchStaffProfilesByJobPostId, staffProfiles } = useStaff("");

  React.useEffect(() => {
    fetchStaffProfilesByJobPostId(jobPostId);
  }, []);

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
          <CommandInput placeholder="Filter staff..." />
          <CommandEmpty>No staff found.</CommandEmpty>
          <CommandGroup>
            {staffProfiles.map((staffProfile) => (
              <CommandItem
                key={staffProfile.id}
                value={staffProfile.id}
                // onSelect={(currentValue) => {
                //   setValue(currentValue === value ? "" : currentValue);
                //   setOpen(false);
                // }}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === staffProfile.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {`${staffProfile.firstname} ${staffProfile.lastname}`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StaffCombobox;
