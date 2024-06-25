"use client";
import { useEffect } from "react";

const LoadGoogleMapsScript = () => {
  useEffect(() => {
    const existingScript = document.getElementById("googleMaps");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.id = "googleMaps";
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Google Maps script loaded");
      };
    }
  }, []);

  return null;
};

export default LoadGoogleMapsScript;
