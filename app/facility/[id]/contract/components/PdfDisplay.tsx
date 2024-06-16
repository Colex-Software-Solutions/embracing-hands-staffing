"use client";
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Contract from "../../../../components/contract/Contract";
import { FacilityProfile } from "@prisma/client";

const PdfDisplay = ({ profile }: { profile: FacilityProfile }) => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Contract profile={profile} />
  </PDFViewer>
);

export default PdfDisplay;
