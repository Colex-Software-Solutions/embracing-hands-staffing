import { IsWithinRadius, isWithinRadius } from "../utils";

describe('isWithinRadius', () => {
  test('should return true if the user is within the job location radius', () => {
    const input: IsWithinRadius = {
      userGeolocation: { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      jobGeolocation: { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      radius: 1, // in kilometers
    };

    expect(isWithinRadius(input)).toBe(true);
  });

  test('should return false if the user is outside the job location radius', () => {
    const input: IsWithinRadius = {
      userGeolocation: { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      jobGeolocation: { latitude: 40.7128, longitude: -74.0060 }, // New York
      radius: 100, // in kilometers
    };

    expect(isWithinRadius(input)).toBe(false);
  });

  test('should handle close proximity within small radius', () => {
    const input: IsWithinRadius = {
      userGeolocation: { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      jobGeolocation: { latitude: 34.0522, longitude: -118.2436 }, // Very close to the first coordinate
      radius: 0.1, // in kilometers
    };

    expect(isWithinRadius(input)).toBe(true);
  });
});
