import { useEffect, useState } from "react";

declare global {
  interface Window {
    initMap: () => void;
  }
}

const useLoadGoogleMapsScript = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("googleMaps");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.id = "googleMaps";
      script.async = true;

      window.initMap = () => {
        setScriptLoaded(true);
      };

      script.onload = () => {
        if (!window.initMap) {
          setScriptLoaded(true);
        }
      };

      script.onerror = () => {
        console.error("Google Maps script failed to load");
      };

      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }

    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return scriptLoaded;
};

export default useLoadGoogleMapsScript;
