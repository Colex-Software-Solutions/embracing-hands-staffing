"use client";
import { Separator } from "@/app/components/ui/separator";
import { AppearanceForm } from "./appearance/appearance-form";
import { useTheme } from "next-themes";

export default function SettingsProfilePage() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <AppearanceForm theme={theme} setTheme={setTheme} />
    </div>
  );
}
