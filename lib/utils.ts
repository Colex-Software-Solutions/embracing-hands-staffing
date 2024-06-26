import { GeoLocation } from "@/app/staff/[id]/profile/components/staff-profile-form";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import skills from "./data/skills.json";
import {
  eachMinuteOfInterval,
  setHours,
  setMinutes,
  isWithinInterval,
  addDays,
  addMinutes,
  startOfDay,
  parse,
  format,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date): string => {
  return format(date, "MM/dd/yyyy");
};

export function formatDateTime(input: Date): string {
  const date = new Date(input);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // getUTCMonth() returns month index starting from 0
  const day = date.getUTCDate();
  let hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  const monthFormatted = month < 10 ? `0${month}` : month;
  const dayFormatted = day < 10 ? `0${day}` : day;
  const hourFormatted = hour < 10 ? `0${hour}` : hour;
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;

  return `${year}-${monthFormatted}-${dayFormatted} ${hourFormatted}:${minuteFormatted} ${ampm}`;
}

export function formatCurrency(
  number: number,
  decimalPlaces: number = 0
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(number / 100);
}

export function weeksBetween(startDate: string, endDate: string): string {
  // One week in milliseconds
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(
    new Date(endDate).getTime() - new Date(startDate).getTime()
  );
  // Convert the difference to weeks
  const differenceInWeeks = differenceInMilliseconds / oneWeek;

  return `${Math.floor(differenceInWeeks)} weeks`;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | undefined;

  return function (...args: Parameters<T>): void {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

export function combineDateAndTime(
  dateString: string,
  timeString: string
): string {
  // Split the time string to get hours, minutes, and AM/PM
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":");

  // Convert hours to 24-hour format if necessary
  if (hours === "12") {
    hours = modifier.toUpperCase() === "AM" ? "0" : "12";
  } else if (modifier.toUpperCase() === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  // Create a Date object using the 24-hour time
  let combinedDateTime = new Date(
    `${dateString}T${hours.padStart(2, "0")}:${minutes}:00`
  );

  const localDateTime = new Date(
    combinedDateTime.getFullYear(),
    combinedDateTime.getMonth(),
    combinedDateTime.getDate(),
    combinedDateTime.getHours(),
    combinedDateTime.getMinutes()
  );

  return localDateTime.toString();
}

export interface IsWithinRadius {
  userGeolocation: GeoLocation;
  jobGeolocation: GeoLocation;
  radius: number;
}

export function isWithinRadius(input: IsWithinRadius): boolean {
  const { latitude: lat1, longitude: lon1 } = input.userGeolocation;
  const { latitude: lat2, longitude: lon2 } = input.jobGeolocation;
  const radius = input.radius;

  // Earth's radius in kilometers
  const R = 6371;

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  // Converts decimal degrees to radians
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Check if the distance is within the radius
  return distance <= radius;
}

export function getMotionVariants(
  startFrom?: "left" | "right",
  delay?: number
) {
  const getX = () => {
    if (startFrom == "left") {
      return -50;
    }
    if (startFrom == "right") {
      return 50;
    }

    return 0;
  };

  return {
    hidden: { opacity: 0, x: getX() }, // Start from 50 pixels left
    visible: {
      opacity: 1,
      x: 0, // End at its normal position
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.3,
        delay,
      },
    },
    exit: { opacity: 0, x: 200 },
  };
}

export function formatInvoiceNumber(number: number): string {
  if (number < 1000) {
    return number.toString().padStart(4, "0");
  }
  return number.toString();
}

export const getSkillPayAmount = (label: string, clockIn: any) => {
  const skill = skills.find((skill) => skill.label === label);

  return skill ? skill.perDiemHourly / 100 : 0;
};

interface GetDifferentialHoursFromHoursWorked {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export const getDifferentialHoursFromHoursWorked = ({
  startDate,
  endDate,
  startTime,
  endTime,
}: GetDifferentialHoursFromHoursWorked): number => {
  const startDateTime = parse(
    `${startDate} ${startTime}`,
    "MM/dd/yyyy HH:mm",
    new Date()
  );
  const endDateTime = parse(
    `${endDate} ${endTime}`,
    "MM/dd/yyyy HH:mm",
    new Date()
  );

  let currentTime = new Date(startDateTime);
  let totalDifferentialMinutes = 0;

  while (currentTime <= endDateTime) {
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    if (isWithinDifferentialHours(hour, minute)) {
      totalDifferentialMinutes++;
    }
    currentTime.setMinutes(currentTime.getMinutes() + 1);
  }

  // Convert minutes to hours for the final result, but return minutes as the task requires
  return parseFloat((totalDifferentialMinutes / 60).toFixed(1));
};

export const isWithinDifferentialHours = (
  hour: number,
  minute: number
): boolean => {
  const SHIFT_DIFFERENTIAL_START = 15; // 3 PM in 24-hour format
  const SHIFT_DIFFERENTIAL_END_HOUR = 6; // 6 AM next day
  const SHIFT_DIFFERENTIAL_END_MINUTES = 30; // 6:30 AM

  // Check if within 3 PM to Midnight
  // OR if within Midnight to 6:30 AM
  if (
    (hour >= SHIFT_DIFFERENTIAL_START && hour <= 23) ||
    hour < SHIFT_DIFFERENTIAL_END_HOUR ||
    (hour === SHIFT_DIFFERENTIAL_END_HOUR &&
      minute < SHIFT_DIFFERENTIAL_END_MINUTES)
  ) {
    return true;
  }

  return false; // Time does not fall within the differential hours
};

interface CalculateHoursBetweenTimes {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export function calculateHoursBetweenTimes({
  startDate,
  endDate,
  startTime,
  endTime,
}: CalculateHoursBetweenTimes): number {
  // Parse start and end dates with times using date-fns
  const startDateTime = parse(
    `${startDate} ${startTime}`,
    "MM/dd/yyyy HH:mm",
    new Date()
  );
  const endDateTime = parse(
    `${endDate} ${endTime}`,
    "MM/dd/yyyy HH:mm",
    new Date()
  );

  // Check if any date is invalid
  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    console.error("Invalid start or end datetime");
    return 0; // Return 0 or handle as needed
  }

  if (endDateTime < startDateTime) {
    console.error("End datetime is before start datetime");
    return 0;
  }

  // Calculate the difference in hours
  const differenceInMilliseconds =
    endDateTime.getTime() - startDateTime.getTime();
  const differenceInHours = differenceInMilliseconds / 3600000;

  // Return the difference in hours rounded to one decimal place
  return parseFloat(differenceInHours.toFixed(1));
}
