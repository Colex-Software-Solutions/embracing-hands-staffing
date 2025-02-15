import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { JobPost, JobStatus } from "@prisma/client";

const localizer = momentLocalizer(moment);

const JobsCalendar = ({ jobs }: { jobs: JobPost[] }) => {
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

  // Convert jobs to events for the calendar
  const events = jobs.map((job) => ({
    title: job.title + " (" + job.status + ")",
    start: new Date(job.startDate + "T00:00:00"),
    end: new Date(job.endDate + "T23:59:59"),
    status: job.status,
  }));

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
            padding: "4px",
          },
        })}
        components={{
          timeSlotWrapper: (props) => (
            <div
              style={{
                height: "160px",
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
