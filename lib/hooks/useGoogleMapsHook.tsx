import { useEffect, useState } from "react";

const useLoadGoogleMapsScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("googleMaps");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.id = "googleMaps";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Google Maps script loaded");
      };

      script.onerror = () => {
        console.error("Google Maps script failed to load");
      };
    } else {
      setScriptLoaded(true);
    }
  }, []);

  return scriptLoaded;
};

export default useLoadGoogleMapsScript;
