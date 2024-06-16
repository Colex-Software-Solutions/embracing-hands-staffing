"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

interface ContractPageProps {
  children: any;
}

const ContractPage: React.FC<ContractPageProps> = ({ children }) => {
  return (
    <Page size="A4" style={styles.page}>
      <Image src="/images/logo.jpeg" style={styles.image} />
      {children}
    </Page>
  );
};

export default ContractPage;
