import { GeoLocation } from "@/app/staff/[id]/profile/components/staff-profile-form";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0"); // Add 1 because months are 0-indexed, pad with leading zero
  const day = new Date(date).getDate().toString().padStart(2, "0"); // Pad with leading zero
  const year = new Date(date).getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatDateTime(input: Date): string {
  const date = new Date(input);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // getUTCMonth() returns month index starting from 0
    const day = date.getUTCDate();
    let hour = date.getUTCHours();
    const minute = date.getUTCMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
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

export function combineDateAndTime(dateString: string, timeString: string): string {
  // Split the time string to get hours, minutes, and AM/PM
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  
  // Convert hours to 24-hour format if necessary
  if (hours === '12') {
    hours = modifier.toUpperCase() === 'AM' ? '0' : '12';
  } else if (modifier.toUpperCase() === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  // Create a Date object using the 24-hour time
  let combinedDateTime = new Date(`${dateString}T${hours.padStart(2, '0')}:${minutes}:00`);

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
  radius: number
}

export function isWithinRadius(input: IsWithinRadius): boolean {
  const { latitude: lat1, longitude: lon1} = input.userGeolocation;
  const { latitude: lat2, longitude: lon2} = input.jobGeolocation;
  const radius = input.radius;

  // Earth's radius in kilometers
  const R = 6371; 

  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  // Converts decimal degrees to radians
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Check if the distance is within the radius
  return distance <= radius;
}

export function getMotionVariants(startFrom?: "left" | "right", delay?: number) {
  const getX = () => {
    if (startFrom == "left") {
      return -50
    }
    if (startFrom == "right") {
      return 50
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
        delay
      },
    },
    exit: { opacity: 0, x: 200 },
  };
}
