import { getDifferentialHoursFromHoursWorked } from '../utils';

describe('getDifferentialHoursFromHoursWorked', () => {
  it('should return 0 hours if the clock-out time is before the clock-in time', () => {
    expect(getDifferentialHoursFromHoursWorked({
      startDate: "06/06/2024",
      endDate: "06/06/2024",
      startTime: "16:00",
      endTime: "15:00"
    })).toBe(0.0);
  });

  it('should calculate the correct number of differential hours within a single day when the period includes the start of differential shift hours', () => {
    expect(getDifferentialHoursFromHoursWorked({
      startDate: "06/06/2024",
      endDate: "06/06/2024",
      startTime: "14:30",
      endTime: "22:00"
    })).toBe(7.0);
  });

  it('should accurately calculate differential hours for overnight shifts that cross midnight and extend beyond the end of differential shift hours', () => {
    expect(getDifferentialHoursFromHoursWorked({
      startDate: "06/06/2024",
      endDate: "06/07/2024",
      startTime: "22:00",
      endTime: "09:00"
    })).toBe(8.5);
  });

  it('should return differential hours for a work period that barely enters the differential shift window', () => {
    expect(getDifferentialHoursFromHoursWorked({
      startDate: "06/06/2024",
      endDate: "06/06/2024",
      startTime: "07:00",
      endTime: "16:00"
    })).toBe(1.0);
  });

  it('should account for partial hours correctly, even when the entire working period is within the early morning differential shift hours', () => {
    expect(getDifferentialHoursFromHoursWorked({
      startDate: "06/06/2024",
      endDate: "06/06/2024",
      startTime: "02:30",
      endTime: "05:30"
    })).toBe(3.0);
  });

  it('should account for partial hours correctly, when both hours are in the shift differential period', () => {
    expect(getDifferentialHoursFromHoursWorked({
      startDate: "04/13/2024",
      endDate: "04/13/2024",
      startTime: "16:51",
      endTime: "22:00"
    })).toBe(5.2);
  });
});
