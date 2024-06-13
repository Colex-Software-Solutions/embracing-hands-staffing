import { calculateHoursBetweenTimes } from '../utils';

describe('calculateHoursBetweenTimes', () => {
    it('calculates the hours correctly when start and end are on the same day', () => {
      const result = calculateHoursBetweenTimes({
        startDate: "04/13/2024", 
        endDate: "04/13/2024", 
        startTime: "16:51", 
        endTime: "22:00"
      });
      expect(result).toBe(5.2);
    });
  
    it('calculates the hours correctly with partial hours', () => {
      const result = calculateHoursBetweenTimes({
        startDate: "04/13/2024", 
        endDate: "04/13/2024", 
        startTime: "08:15", 
        endTime: "17:45"
      });
      expect(result).toBe(9.5);
    });
  
    it('handles times spanning midnight correctly', () => {
      const result = calculateHoursBetweenTimes({
        startDate: "04/13/2024", 
        endDate: "04/14/2024", 
        startTime: "23:00", 
        endTime: "02:00"
      });
      expect(result).toBe(3.0);
    });
  
    it('calculates the hours correctly over multiple days', () => {
      const result = calculateHoursBetweenTimes({
        startDate: "04/13/2024", 
        endDate: "04/15/2024", 
        startTime: "09:00", 
        endTime: "10:00"
      });
      expect(result).toBe(49.0);
    });
  
    it('returns zero if end date and time is before start date and time', () => {
      const result = calculateHoursBetweenTimes({
        startDate: "04/13/2024", 
        endDate: "04/13/2024", 
        startTime: "17:00", 
        endTime: "08:00"
      });
      expect(result).toBe(0);
    });
  
    it('handles incorrect date formats gracefully', () => {
      const result = calculateHoursBetweenTimes({
        startDate: "13/04/2024", 
        endDate: "13/04/2024", 
        startTime: "17:00", 
        endTime: "20:00"
      });
      expect(result).toBe(0);
    });
  });
