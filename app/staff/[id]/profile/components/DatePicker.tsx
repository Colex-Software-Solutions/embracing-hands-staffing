import React, { useState } from "react";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export type CustomDatePickerProps = {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  disabled: (date: Date) => boolean;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateChange,
  disabled,
}) => {
  const [month, setMonth] = useState<Date>(selectedDate || new Date());
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 + 10 },
    (_, i) => currentYear - i + 10
  );
  const months = Array.from({ length: 12 }, (_, i) => i);

  const handleDateChange = (date: Date | undefined) => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] pl-3 text-left font-normal"
        >
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between items-center p-2">
          <select
            value={month.getMonth()}
            onChange={(e) =>
              setMonth(
                new Date(month.getFullYear(), parseInt(e.target.value), 1)
              )
            }
            className="rounded border p-1"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {format(new Date(2000, m), "MMMM")}
              </option>
            ))}
          </select>
          <select
            value={month.getFullYear()}
            onChange={(e) =>
              setMonth(new Date(parseInt(e.target.value), month.getMonth(), 1))
            }
            className="rounded border p-1"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          month={month}
          onMonthChange={setMonth}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
