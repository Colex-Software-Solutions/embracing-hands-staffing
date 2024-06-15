"use client";
import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Contract from "../../../components/Contract";

const PdfPage: React.FC = () => (
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Contract />
  </PDFViewer>
);

export default PdfPage;
