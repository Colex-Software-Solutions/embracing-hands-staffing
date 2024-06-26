"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { FacilityProfile } from "@prisma/client";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 30,
  },
  logo: {
    width: 100,
    height: 75,
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 9,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    marginBottom: 5,
  },
  signature: {
    width: 100,
    height: 50,
    marginTop: 20,
  },
  signatureLabel: {
    marginTop: 10,
  },
});

const FeeSheet = ({ profile }: { profile: FacilityProfile | null }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page style={styles.page}>
          <Image style={styles.logo} src="/images/logo.jpeg" />
          <View style={styles.section}>
            <Text>Exhibit A</Text>
            <Text>Fee Schedule</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Contract Position</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Per Diem- Hourly</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Travel/Contract Rates</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Crisis Rates</Text>
              </View>
            </View>
            {/* Repeat for each row */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Interim Director</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$100.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$100.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$125.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Consulting</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$75.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$82.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$107.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Certified Surgical First Assist/CFA
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$60.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$67.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$92.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>RN First Assist</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$73.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$80.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$105.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Pre-Op RN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$58.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$65.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$80.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>PACU RN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$58.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$65.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$80.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>OR Circulator RN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$63.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$70.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$95.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>OR Circulator/Scrub RN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$69.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$76.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$101.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>OR Circulator RN - CVOR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$75.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$82.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$107.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Circulator RN - IR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$69.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$76.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$101.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Circulator RN - Pediatric</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$69.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$76.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$101.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>RN - ER</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$70.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$77.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$102.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>RN - ICU</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$70.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$77.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$102.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>RN – Med Surg</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$68.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$75.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$100.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Licensed Practical Nurse/LVN
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$45.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$52.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$77.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Certified Surgical Tech</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$45.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$52.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$77.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Sterile Processing Tech</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$45.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$52.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$77.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>X-ray Techs</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$45.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$52.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$77.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Certified Medical Assistant
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$42.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$49.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$74.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Certified Nursing Assistant
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$42.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$49.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$74.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Patient Care Tech</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$42.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$49.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$74.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Patient Sitter</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$42.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$49.00</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$74.00</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Shift Differential (3pm-630am)
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$5.00</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Weekend Differential</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$5.00</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Charge Position</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$5.00</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Teaching/Mentoring Differential
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$5.00</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Call Pay</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>$6.00</Text>
              </View>
              <View style={styles.tableCol}></View>
              <View style={styles.tableCol}></View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.content}>
              <Text style={styles.bold}>{`\n\n`}Customers:</Text>
              Facility Customer will pay one and one-half (1.5) times the
              regular rate for all hours worked in excess of forty (40) hours in
              a Monday – Sunday work week.
            </Text>
            <Text style={styles.content}>
              <Text style={styles.bold}>Administrative Fee:</Text> 3% of the
              total invoice.
            </Text>
            <Text style={styles.content}>
              <Text style={styles.bold}>Credit Card Convenience Fee:</Text> If
              credit card is used for payment, there will be a 4% fee
              automatically added.
            </Text>
            <Text style={styles.content}>
              <Text style={styles.bold}>Bank Info:</Text> Zelle
            </Text>
          </View>
          <View>
            <Text style={styles.signatureLabel}>Signature: {"\n"}</Text>
            {profile?.contractSignatureUrl ? (
              <Image
                style={styles.signature}
                src={profile.contractSignatureUrl}
              />
            ) : (
              <Text>_____________________________________________________</Text>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default FeeSheet;
