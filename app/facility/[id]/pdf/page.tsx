import React from "react";
import PdfDisplay from "./components/PdfDisplay";
import { facilityProvider } from "@/app/providers/facilityProvider";
import { FacilityProfile } from "@prisma/client";

export default async function PdfPage({ params }: { params: { id: string } }) {
  const profile = await facilityProvider.getFacilityProfile(params.id);
  return <PdfDisplay profile={profile as FacilityProfile} />;
}
