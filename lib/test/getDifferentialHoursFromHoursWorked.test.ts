import { getDifferentialHoursFromHoursWorked } from '../utils'; // Adjust the path as necessary

describe('getDifferentialHoursFromHoursWorked', () => {
  it('should return 0 hours if the clock-out time is before the clock-in time', () => {
    const clockIn = new Date("2024-06-06T16:00:00");
    const clockOut = new Date("2024-06-06T15:00:00");
    expect(getDifferentialHoursFromHoursWorked(clockIn, clockOut)).toBe(0);
  });

  it('should calculate the correct number of differential hours within a single day when the period includes the start of differential shift hours', () => {
    const clockIn = new Date("2024-06-06T14:30:00");
    const clockOut = new Date("2024-06-06T22:00:00");
    expect(getDifferentialHoursFromHoursWorked(clockIn, clockOut)).toBe(7); // From 3 PM to 10 PM
  });

  it('should accurately calculate differential hours for overnight shifts that cross midnight and extend beyond the end of differential shift hours', () => {
    const clockIn = new Date("2024-06-06T22:00:00");
    const clockOut = new Date("2024-06-07T09:00:00");
    expect(getDifferentialHoursFromHoursWorked(clockIn, clockOut)).toBe(8.5); // From 10 PM to 9 AM
  });

  it('should return differential hours for a work period that barely enters the differential shift window', () => {
    const clockIn = new Date("2024-06-06T06:00:00");
    const clockOut = new Date("2024-06-06T15:25:00");
    expect(getDifferentialHoursFromHoursWorked(clockIn, clockOut)).toBe(0.9); // From 3 PM to 3:25 PM (15 minutes, or 0.25 hours)
  });

  it('should account for partial hours correctly, even when the entire working period is within the early morning differential shift hours', () => {
    const clockIn = new Date("2024-06-06T02:30:00");
    const clockOut = new Date("2024-06-06T05:30:00");
    expect(getDifferentialHoursFromHoursWorked(clockIn, clockOut)).toBe(3); // From 3 AM to 5:30 AM
  });
});

