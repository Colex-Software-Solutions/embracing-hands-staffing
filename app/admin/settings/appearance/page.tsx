"use client";
import { useTheme } from "next-themes";
import { Separator } from "@/app/components/ui/separator";
import { AppearanceForm } from "./appearance-form";
import { useEffect, useState } from "react";

export default function SettingsAppearancePage() {
  // We need to pass the theme from the parent component or it will cause react Hydration error
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className="space-y-6 ml-2">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm theme={theme} setTheme={setTheme} />
    </div>
  );
}
