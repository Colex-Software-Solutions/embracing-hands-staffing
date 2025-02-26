import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { JobPost, JobStatus, Shift } from "@prisma/client";
import axios from "axios";

const localizer = momentLocalizer(moment);

const JobsCalendar = ({ jobs }: { jobs: JobPost[] }) => {
  const [events, setEvents] = useState<any[]>([]);
  // Function to map job status to color
  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "OPEN":
        return "gray";
      case "COMPLETED":
        return "green";
      case "CLOSED":
        return "red";
      default:
        return "var(--accent)";
    }
  };
  const getShiftForJob = async (jobId: string) => {
    try {
      // Passing jobId as a query parameter, adjust the API route accordingly.
      const response = await axios.get(`/api/shift?jobId=${jobId}`);
      return response.data; // Assuming the API returns an object with shift details
    } catch (error) {
      console.error("Error fetching shift for job", jobId, error);
      return null;
    }
  };

  // Load events using useEffect
  useEffect(() => {
    const loadEvents = async () => {
      const eventsArr = await Promise.all(
        jobs.map(async (job) => {
          // Fetch the shift data for this job
          const shift: Shift = await getShiftForJob(job.id);

          // Default times in case shift is not available or misformatted
          let defaultstartTime = "T00:00:00";
          let defaultEndTime = "T00:00:59";

          return {
            title: `${job.title} (${job.status})`,
            start: new Date(
              shift && shift.start
                ? shift.start
                : job.startDate + defaultstartTime
            ),
            end: new Date(
              shift && shift.end ? shift.end : job.endDate + defaultEndTime
            ),
            status: job.status,
          };
        })
      );
      setEvents(eventsArr);
    };

    loadEvents();
  }, [jobs]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        className={"bg-white h-[100vh] text-black"}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={(event: any) => ({
          style: {
            backgroundColor: getStatusColor(event.status),
            borderRadius: "0px",
            width: "full",
            padding: "4px",
          },
        })}
        components={{
          timeSlotWrapper: (props) => (
            <div
              style={{
                height: "160px",
                width: "140px",
              }}
              {...props}
            />
          ),
        }}
        defaultView="week"
        views={["month", "week", "agenda"]}
        popup={true}
        selectable
      />
    </div>
  );
};

export default JobsCalendar;
