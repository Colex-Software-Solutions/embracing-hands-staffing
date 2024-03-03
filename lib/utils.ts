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

export function formatCurrency(number: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number / 100);
}

export function weeksBetween(startDate: Date, endDate: Date): string {
  // One week in milliseconds
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  // Calculate the difference in milliseconds
  const differenceInMilliseconds = Math.abs(
    endDate.getTime() - startDate.getTime()
  );
  // Convert the difference to weeks
  const differenceInWeeks = differenceInMilliseconds / oneWeek;

  return `${Math.floor(differenceInWeeks)} weeks`;
}
