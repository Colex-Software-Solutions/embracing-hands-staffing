import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import data from "@/lib/data/skills.json";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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
import React, { useState } from "react";

interface SkillsComboboxProps {
  children: React.ReactNode;
  handleAddSkill: (skill: string) => void;
}

export function SkillsCombobox({
  handleAddSkill,
  children,
}: SkillsComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const skills = data;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {children}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search skill..." className="h-9" />
          <CommandEmpty>No skill found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-scroll">
            {skills.map((skill) => (
              <CommandItem
                key={skill.value}
                value={skill.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  handleAddSkill(skill.label);
                }}
              >
                {skill.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === skill.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
