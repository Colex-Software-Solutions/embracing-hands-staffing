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
