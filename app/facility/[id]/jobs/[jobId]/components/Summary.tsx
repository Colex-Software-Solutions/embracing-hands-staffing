"use client";
import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/app/components/ui/table";
import { ShiftsSummary } from "../page";
import SummaryStatsCard from "./SummaryStatsCard";
import { formatDateTime } from "@/lib/utils";
import { JobPost } from "@prisma/client";

const Summary = ({
  shifts,
  jobPost,
}: {
  shifts: ShiftsSummary[];
  jobPost: JobPost;
}) => {
  const [expandedShiftId, setExpandedShiftId] = useState<string | null>(null);

  const toggleShiftDetails = (shiftId: string) => {
    if (expandedShiftId === shiftId) {
      setExpandedShiftId(null);
    } else {
      setExpandedShiftId(shiftId);
    }
  };

  const { totalHours, jobStartDate, jobEndDate, totalStaff } = useMemo(() => {
    let totalMinutes = 0;
    let staffIds = new Set();
    let jobDates = shifts.map((shift) => new Date(shift.start).getTime());

    shifts.forEach((shift) => {
      if (shift.clockInTime && shift.clockOutTime) {
        const start = new Date(shift.clockInTime).getTime();
        const end = new Date(shift.clockOutTime).getTime();
        const durationMinutes = (end - start) / 60000; // Total minutes for shift

        const breakTimeMinutes = shift.breaks.reduce((total, currentBreak) => {
          if (currentBreak.start && currentBreak.end) {
            const breakStart = new Date(currentBreak.start).getTime();
            const breakEnd = new Date(currentBreak.end).getTime();
            return total + (breakEnd - breakStart) / 60000; // Minutes of this break
          }
          return total;
        }, 0);
        totalMinutes += durationMinutes - breakTimeMinutes;
      }

      staffIds.add(shift.staffProfileId);
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const totalRemainingMinutes = Math.floor(totalMinutes % 60);
    const formattedTotalHours = `${totalHours}:${
      totalRemainingMinutes < 10 ? "0" : ""
    }${totalRemainingMinutes}`;

    const jobStartDate = new Date(Math.min(...jobDates)).toLocaleDateString();
    const jobEndDate = new Date(Math.max(...jobDates)).toLocaleDateString();

    return {
      totalHours: formattedTotalHours,
      jobStartDate,
      jobEndDate,
      totalStaff: staffIds.size,
    };
  }, [shifts]);

  const calculateHoursWorked = (shift: ShiftsSummary) => {
    if (!shift.clockInTime || !shift.clockOutTime) return "0:00";
    const start = new Date(shift.clockInTime).getTime();
    const end = new Date(shift.clockOutTime).getTime();
    const durationMinutes = (end - start) / 60000; // Total minutes

    const breakTimeMinutes = shift.breaks.reduce((total, currentBreak) => {
      if (currentBreak.start && currentBreak.end) {
        const breakStart = new Date(currentBreak.start).getTime();
        const breakEnd = new Date(currentBreak.end).getTime();
        return total + (breakEnd - breakStart) / 60000;
      }
      return total;
    }, 0);

    const totalMinutes = Math.max(0, durationMinutes - breakTimeMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Job Summary - {jobPost.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Staff Name</TableHead>
              <TableHead>Shift Time</TableHead>
              <TableHead>Hours Worked</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shifts.map((shift) => (
              <React.Fragment key={shift.id}>
                <TableRow onClick={() => toggleShiftDetails(shift.id)}>
                  <TableCell>
                    {shift.staffProfile.firstname} {shift.staffProfile.lastname}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(shift.start)} - {formatDateTime(shift.end)}
                  </TableCell>
                  <TableCell>{calculateHoursWorked(shift)} Hours</TableCell>
                  <TableCell>
                    <button>
                      {expandedShiftId === shift.id
                        ? "Hide Details"
                        : "View Details"}
                    </button>
                  </TableCell>
                </TableRow>
                {expandedShiftId === shift.id && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <span className="font-semibold">Clock In:</span>{" "}
                      {shift.clockInTime
                        ? formatDateTime(shift.clockInTime)
                        : "N/A"}
                      <br />
                      <span className="font-semibold">Clock Out: </span>
                      {shift.clockOutTime
                        ? formatDateTime(shift.clockOutTime)
                        : "N/A"}
                      <br />
                      <p className="font-semibold text-lg">Breaks:</p>{" "}
                      {shift.breaks.map((b: any, index: number) => (
                        <span key={index}>
                          {index + 1}. {formatDateTime(b.start)} to{" "}
                          {b.end ? formatDateTime(b.end) : "In progress"}
                          <br />
                        </span>
                      ))}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        {/* Job Summary Section */}
        <div className="my-4 p-4 border-t-2">
          <h3 className="text-2xl font-semibold">Overall Job Summary</h3>
          <div className="flex space-x-4 mt-4">
            <SummaryStatsCard
              title="Total Hours Worked"
              value={`${totalHours} Hours`}
            />
            <SummaryStatsCard
              title="Job Duration"
              value={`${jobStartDate} to ${jobEndDate}`}
            />
            <SummaryStatsCard title="Total Staff" value={totalStaff} />
            <SummaryStatsCard title="Job Status" value={jobPost.status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;
