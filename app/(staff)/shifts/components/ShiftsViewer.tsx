"use client";
import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  isToday,
} from "date-fns";
import { ShiftCard } from "./ShiftCard";
import { DatePickerWithRange } from "@/app/components/ui/date-picker";
import { DateRange } from "react-day-picker";
import { Break, Shift } from "@prisma/client";
import TodayShiftCard from "./TodayShiftCard";

export interface StaffShift extends Shift {
  location: string;
  staffName: string;
  facilityName: string;
  title: string;
  breaks: Break[];
  latitude: number;
  longitude: number;
}
export function ShiftsViewer({ shifts }: { shifts: StaffShift[] }) {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const [filteredShifts, setFilteredShifts] = useState<StaffShift[]>([]);

  useEffect(() => {
    if (!selectedRange.from || !selectedRange.to) {
      return;
    }

    const visibleShifts = shifts.filter(
      (shift) =>
        selectedRange.from &&
        selectedRange.to &&
        isWithinInterval(new Date(shift.start), {
          start: selectedRange.from,
          end: selectedRange.to,
        })
    );

    setFilteredShifts(
      visibleShifts.sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.end).getTime()
      )
    );
  }, [selectedRange]);

  const todayShift = filteredShifts.find((shift) =>
    isToday(new Date(shift.start))
  );

  return (
    <>
      <TodayShiftCard
        shift={todayShift}
        setFilteredShifts={setFilteredShifts}
      />
      <h1 className="sm:text-3xl text-xl  font-bold">shifts Viewer</h1>
      <div className="w-full border-t pt-4">
        <p className="text-xl">
          Modify the date range to view your shifts in that period
        </p>
        <div className="my-4">
          <DatePickerWithRange
            date={selectedRange}
            setDate={setSelectedRange}
          />
        </div>
        <div className="shifts-grid">
          {filteredShifts.length > 0 ? (
            filteredShifts.map((shift) => (
              <ShiftCard key={shift.id} shift={shift} />
            ))
          ) : (
            <div>No shifts found for this period.</div>
          )}
        </div>
      </div>
    </>
  );
}
