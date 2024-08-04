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
import { FacilityProfile } from "@prisma/client";
import { format } from "date-fns";
import ContractPage from "./ContractPage";

const styles = StyleSheet.create({
  signatureContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  signature: {
    height: 40,
    width: 100,
  },
  signatureLabel: {
    marginRight: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 12,
    marginTop: 10,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  contentWithSpace: {
    fontSize: 10,
    lineHeight: 1.5,
    marginTop: 20,
  },
  listItem: {
    marginTop: 3,
    fontSize: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 15,
    fontSize: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  subHeading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textDecoration: "underline",
  },
});

const Contract = ({ profile }: { profile: FacilityProfile | null }) => {
  const facilityName = profile?.name;
  const location = `${profile?.city}, ${profile?.state}, ${profile?.country}`;
  return (
    <Document>
      <ContractPage>
        <Text style={styles.title}>
          ATTN: {facilityName ? facilityName : "Facility Customer"}
        </Text>
        <Text style={styles.content}>
          In an effort to assist your facility in meeting its staffing needs, I
          wanted to take a brief moment of your time to introduce myself and our
          company, Embracing Hands Healthcare Staffing. When faced with so many
          choices in terms of temporary staffing alternatives, we believe that
          it's important to choose wisely. Embracing Hands Healthcare Staffing
          offers per diem and travel staff to meet the needs of even the most
          exacting facilities. Our company operates in a 100% TJC compliant way
          to lessen your facility's risk and to provide unparalleled quality
          assurance and customer service. Here are just a few reasons why you
          might consider working with us:
        </Text>
        <View style={{ marginTop: 10 }}>
          {[
            "We provide excellent, clinically competent and caring healthcare providers",
            "We provide staffing services in per-diem, traveler, and permanent placement",
            "We are licensed and fully insured",
            "All of our healthcare providers are competency tested, background checked, and drug screened",
            "All of our healthcare providers undergo Annual Education reviews to ensure on-going compliance with all OSHA, TJC, and HIPAA standards",
            "All of our business operations meet TJC certification benchmarks/standards",
            "We can help to streamline your facility's workflow while providing adequate staffing to help you to comply with your hospital's nurse/patient ratio goals",
            "We can act swiftly and efficiently with unparalleled customer service",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`${
              index + 1
            }. ${item}`}</Text>
          ))}
        </View>
        <Text style={styles.footer}>
          Because we would love to assist you with your immediate staffing
          needs, I have enclosed a copy of our current Service Contract and
          pricing information. If you require per-diem, travel, or permanent
          placement help, we have excellent clinicians available now for all
          shifts. You can call our office to book a clinician 24 hours a day at
          (469)-362- 0818.
        </Text>
        <Text style={styles.footer}>
          We look forward to working with you and hope to hear from you soon.
        </Text>
        <Text style={[styles.footer, styles.bold]}>Warm regards,</Text>
        <Text style={styles.footer}>Embracing Hands Healthcare Staffing</Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.heading}>
          Why choose Embracing Hands Healthcare Staffing
        </Text>
        <Text style={styles.title}>Experience</Text>
        <Text style={styles.content}>
          Embracing Hands Healthcare Staffing is an experienced healthcare
          staffing company with qualified and competent healthcare providers
          ready to assist you in meeting your human resource needs.
        </Text>
        <Text style={styles.title}>Decreased Liability</Text>
        <Text style={styles.content}>
          All employees of Embracing Hands Healthcare Staffing operate under
          our:
        </Text>
        <View>
          <Text style={styles.listItem}>• Worker’s Compensation Policy</Text>
          <Text style={styles.listItem}>• General Liability Policy</Text>
          <Text style={styles.listItem}>• Professional Liability Policy</Text>
        </View>
        <Text style={styles.title}>Quality</Text>
        <Text style={styles.content}>All of our clinical employees have:</Text>
        <View>
          <Text style={styles.listItem}>• Criminal background check</Text>
          <Text style={styles.listItem}>• Prior employment verification</Text>
          <Text style={styles.listItem}>• Credentials check</Text>
          <Text style={styles.listItem}>• I-9 compliance</Text>
          <Text style={styles.listItem}>
            • Current professional license with the appropriate Board of Nursing
            or applicable governing body
          </Text>
          <Text style={styles.listItem}>
            • Minimum of (2) satisfactory relevant professional references
          </Text>
          <Text style={styles.listItem}>
            • Copy and verifiable BLS and any additional certifications as
            required by designated areas (ACLS, PALS, etc.)
          </Text>
          <Text style={styles.listItem}>
            • Minimum of (1) year current, relevant experience
          </Text>
          <Text style={styles.listItem}>
            • Acceptable background verifications including OIG and criminal
          </Text>
          <Text style={styles.listItem}>• Current physical examination</Text>
          <Text style={styles.listItem}>
            • Negative PPD within (1) year or chest X-ray
          </Text>
          <Text style={styles.listItem}>
            • MMR immunization record (titer or booster if necessary)
          </Text>
          <Text style={styles.listItem}>
            • Hepatitis B series or declination signed
          </Text>
          <Text style={styles.listItem}>
            • Negative 10-Panel drug screen prior to placement
          </Text>
          <Text style={styles.listItem}>
            • Annual completion of competency skills checklist Proof of passing
            score on medication calculation exam
          </Text>
          <Text style={styles.listItem}>
            • Completion of all Joint Commission and OSHA education for HCP
          </Text>
        </View>
        <Text style={styles.footer}>
          Embracing Hands Healthcare Staffing is here to meet all of your
          employment needs. Give us a call at (469)362-0818 to learn about all
          of our services and competitive pricing!
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.heading}>
          Letter of Understanding between Embracing Hands Healthcare Staffing
          and {facilityName ? facilityName : "Facility Customer"}
        </Text>
        <Text style={styles.subHeading}>Reassignment of Personnel:</Text>
        <Text style={styles.content}>
          Client has the right to reassign Agency personnel as appropriate given
          the individual's education, experience, skills, and any special
          preparation/certifications. Prior to reassignment, Notifications will
          be provided to the Agency immediately.
        </Text>
        <Text style={styles.subHeading}>OSHA/Safety Compliance:</Text>
        <Text style={styles.content}>
          Agency will provide orientation to OSHA regulations and requirements.
          Agency will maintain records as required and applicable. Hospital will
          provide "site" specific information relative to applicable OSHA
          regulations and client policies and procedures including location of
          protective equipment, site procedures and hazard signage. Agency shall
          require all personnel to report immediately any safety issues,
          unexpected incidents, errors, and sentinel events.
        </Text>
        <Text style={styles.subHeading}>Subcontractors:</Text>
        <Text style={styles.content}>
          All Agency personnel will be employees of the agency. If Agency is
          unable to meet the client needs and identifies a subcontractor
          available to provide service, Agency will contact client and request a
          special exception to this clause. The exception will be documented in
          an email message between the parties.
        </Text>

        <Text style={styles.subHeading}>Mutual Responsibilities:</Text>
        <Text style={styles.content}>
          Consult and cooperate on a continuing basis in the establishment of
          mutually acceptable standards and procedures or selection and
          assignment of personnel. Agency agrees to screen and test personnel
          based on client requirements. Client agrees to determine the
          competency of the personnel and periodically evaluate the competency
          of assigned personnel. It is the CLIENT's responsibility to orient
          staff to the relevant unit and setting and program-specific policy and
          procedures.
        </Text>

        <Text style={styles.subHeading}>Conflict of Interest:</Text>
        <Text style={styles.content}>
          All ACCESS employees must disclose actual and potential conflicts of
          interests to our agency. Because of the highly competitive nature of
          the Staffing industry, management (staff) employees are asked to make
          a commitment to refrain from any acts or associations that would
          create a conflict interest with the operating philosophy and goals of
          Embracing Hands Healthcare Staffing. A conflict of interest is any
          situation in which an agency employee experiences a conflict between
          personal interests and the interests of the agency. Possible areas of
          conflict of interest may include, but are not limited to, when an
          EMBRACING HANDS employee:
        </Text>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.listItem}>
            1. Has a significant financial interest in another business which
            either does business with or competes with the agency.
          </Text>
          <Text style={styles.listItem}>
            2. Is being directly compensated by a competitor for rendering
            service.
          </Text>
          <Text style={styles.listItem}>
            3. Is receiving money, gifts, and/or is being entertained to such a
            large extent that such money, gifts, and/or entertainment could be
            amount to a bribe or kickback to refer business.
          </Text>
        </View>
        <Text style={styles.contentWithSpace}>
          All EMBRACING HANDS management employees, including office employees
          and anyone in a position to refer business, must disclose actual and
          potential conflict to the Owners. Failure to disclose any conflict of
          interest could constitute a violation of the law. As a condition of
          employment, employees are asked to sign the Conflict of Interest
          Statement in which they agree to devote his/her best efforts to the
          company and not directly or indirectly be engaged in or connected with
          any other commercial pursuits whatsoever without written authorization
          of the company.
        </Text>

        <Text style={styles.subHeading}>Complaints:</Text>
        <Text style={styles.content}>
          The organization provides notice to the public that when an individual
          has any concerns about patient care and safety in the organization
          that the organization has not addressed, he or she is encouraged to
          contact the organization's management team. If your concerns cannot be
          resolved through the organization, you are encouraged by the
          organization to contact the Joint Commission's Office of Quality
          Monitoring to report any concerns or register complaints about a Joint
          Commission-accredited health care organization by either calling
          1-800-994-6610 or emailing them at complaint@jcaho.org.
        </Text>
        <Text style={styles.content}>
          Complaints can also be reported to the Department of Health in New
          York, 90 Church Street, New York, NY, 10007; 212-417-5888; in New
          Jersey at 877-222-3737; and in Maryland at 410-887-3740.
        </Text>
        <Text style={styles.heading}>Customer Complaint Resolution</Text>
        <Text style={styles.content}>
          It is the policy of Embracing Hands Healthcare Staffing to record all
          customer complaints, to investigate all complaints and to take
          appropriate action with prompt response to the customer. It is
          extremely important to us that an excellent customer service
          relationship be maintained.
        </Text>
        <View style={{ marginTop: 10 }}>
          {[
            "The facility will inform the staff of Embracing Hands Healthcare Staffing of their complaint resolution policy.",
            "Embracing Hands Healthcare Staffing will provide their customers with their complaint resolution policy.",
            "Patients, family of patients, or customer staff may report concerns about the care provided by Embracing Hands Healthcare Staffing staff verbally or in writing to the manager of the facility and/or key contact supervisor at Embracing Hands Healthcare Staffing. If the complaint is made to a facility manager then that manager will contact Embracing Hands Healthcare Staffing as soon as possible to register the complaint.",
            "Embracing Hands Healthcare Staffing staff will meet weekly to review any complaints.",
            "The Embracing Hands Healthcare Staffing administrator in charge will respond to the concerns as soon as possible or within 24 hours.",
            "The person making the complaint will be contacted via phone by the administrator at Embracing Hands Healthcare Staffing.",
            "An acknowledgment letter will be sent the day the concern is received.",
            "The issue will be investigated and a resolution plan developed.",
            "A letter explaining the steps taken to investigate the concern will be sent to the person filing the complaint, within 30 days.",
            "Should the investigation take longer than 30 days, an interim response letter will be sent.",
            "Complaints will be logged and the process audited on an on-going basis.",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`${
              index + 1
            }. ${item}`}</Text>
          ))}
        </View>

        <Text style={styles.subHeader}>Responsibilities</Text>
        <Text style={styles.subHeader}>
          {facilityName ? facilityName : "Facility Customer"}
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            "The customer staff will address any complaints of the patient and or family per their complaint resolution process.",
            "The manager of the unit that receives a complaint regarding Embracing Hands Healthcare Staffing staff will contact the administrator at Embracing Hands Healthcare Staffing as soon as possible.",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`${
              index + 1
            }. ${item}`}</Text>
          ))}
        </View>

        <Text style={styles.subHeader}>
          Embracing Hands Healthcare Staffing Staff
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            "Should a patient or family complain about the customer staff, or regarding any issues not related to care provided, the Embracing Hands Healthcare Staffing staff will communicate the complaint to the manager of the unit immediately.",
            "If the patient complains to the Embracing Hands Healthcare Staffing staff about their treatment, the Embracing Hands Healthcare Staffing staff will communicate with the Embracing Hands Healthcare Staffing administrator directly as well as inform the facility manager or staff if he/she is not available.",
            "Complaint information is not documented in the medical record.",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`${
              index + 1
            }. ${item}`}</Text>
          ))}
        </View>
      </ContractPage>
      <ContractPage>
        <Text style={styles.heading}>
          Supplemental Staffing Agreement for Healthcare Personnel by and
          Between Embracing Hands Healthcare Staffing and{" "}
          {facilityName ? facilityName : "Facility Customer"}
        </Text>
        <Text style={styles.content}>
          This Supplemental Staffing Agreement for Healthcare Personnel
          ("Agreement"), is made by and between Embracing Hands Healthcare
          Staffing, a Texas corporation (hereinafter "Agency") and Cedarwood
          Surgical Center (hereinafter "
          {facilityName ? facilityName : "Facility Customer"}").
        </Text>
        <Text style={styles.subHeading}>Recitals</Text>
        <Text style={styles.content}>
          Whereas Agency provides professional health care staffing services as
          required by {facilityName ? facilityName : "Facility Customer"}; and
          {"\n"}
          Whereas {facilityName ? facilityName : "Facility Customer"} owns and
          operates a healthcare facility in Texas; and{"\n"}
          Whereas {facilityName ? facilityName : "Facility Customer"} desires to
          contract with Agency and Agency desires to contract with{" "}
          {facilityName ? facilityName : "Facility Customer"} to provide
          professional health care staffing services as provided herein (the
          "Services") with both parties acknowledging that{" "}
          {facilityName ? facilityName : "Facility Customer"} shall retain
          professional and administrative responsibility for the Services
          rendered.
        </Text>
        <Text style={styles.subHeading}>Agreement</Text>
        <Text style={styles.content}>
          Now, therefore, for and in consideration of the mutual covenants and
          promises set forth herein, and for such other good and valuable
          consideration, the receipt and sufficiency of which are hereby
          acknowledged, the parties hereto agree as follows:
        </Text>
        <Text style={styles.subHeading}>Section 1 – Agency Obligations</Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>1.1 Scope of Services.</Text> Agency shall
          use its best efforts to provide qualified Health Care Professionals
          ("Placements") in accordance with the specifications in Sections 1.2
          through 1.6 of this Agreement, twenty-four (24) hours a day, seven (7)
          days per week for specific positions requested by{" "}
          {facilityName ? facilityName : "Facility Customer"}. Placements are
          further defined as "Per-diem" and "Traveler".
        </Text>
        <Text style={styles.contentWithSpace}>
          A "Per-diem" placement is a qualified healthcare provider that is NOT
          on a signed "Travel Nurse Booking Agreement" (See Exhibit C) between
          Agency and Facility.
        </Text>
        <Text style={styles.contentWithSpace}>
          A "Traveler" placement is a qualified healthcare provider that IS on a
          signed "Travel Nurse Booking Agreement" (See Exhibit C) between Agency
          and Facility.
        </Text>
        <Text style={styles.subHeading}>1.2 Background Information</Text>
        <Text style={styles.content}>
          Agency shall maintain on file, and upon request provide to Facility
          Customer general background information on each Placement including
          the following:
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            "Employment application",
            "A skills assessment for area of specialty",
            "Two (2) professional/business references",
            "Copy of license, including a valid Texas license or valid temporary or compact state license",
            "Copy of current Basic Cardiac Life Support certification for health care providers",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`• ${item}`}</Text>
          ))}
        </View>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>
          1.3 Qualifications and Requirements
        </Text>
        <Text style={styles.content}>
          Prior to providing Services hereunder, Agency represents and shall
          assure that all Placements meet the following requirements, evidence
          of which shall be provided to{" "}
          {facilityName ? facilityName : "Facility Customer"} upon request:
        </Text>
        <Text style={styles.contentWithSpace}>
          Negative result to a ten (10) panel urine drug screen
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            "Physical Examination Report (Medical Release)",
            "PPD results (to be completed annually). In the event PPD is positive, a chest x-ray (per CDC/Joint Commission requires 1 chest x-ray on file without an expiration) or evidence of symptom review by a health care professional.",
            "Rubella, or titer",
            "Rubeola, or titer",
            "Chicken Pox history or Varicella titer",
            "Hepatitis B vaccines, or titer, or statement of refusal",
            "Criminal Background Investigation",
            "OIG List of Excluded Providers",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`• ${item}`}</Text>
          ))}
        </View>

        <Text style={styles.subHeading}>
          1.4 Related Experience and Additional Certifications
        </Text>
        <Text style={styles.content}>
          Each Placement shall meet the work experience and certifications as
          set forth in Exhibit B of this Agreement or as otherwise applicable to
          the healthcare professional being placed. The Placement’s experience
          must be in assignments, which carry similar levels of responsibility
          and require similar qualifications to the assignment in which the
          Placement is to work at{" "}
          {facilityName ? facilityName : "Facility Customer"}.
        </Text>

        <Text style={styles.subHeading}>1.5 Identification</Text>
        <Text style={styles.content}>
          Each Placement shall wear in an easily visible location on his/her
          clothing an identification badge which prominently displays a
          photograph of Placement, Agency’s name, and Placement’s full name and
          licensure or certification while providing Services hereunder.
        </Text>

        <Text style={styles.subHeading}>1.6 Instruction and Examinations</Text>
        <Text style={styles.content}>
          Placements must complete instruction conducted by Agency in Infection
          Control, Body Mechanics, Documentation, Dress Code, Age Specific
          competencies, Code Situation Policies and Procedures, Medication
          Administration, as applicable to licensure and assignment, written
          examination appropriate to the area of specialty or prospective
          assignment, and any additional instruction or examinations as may be
          requested by {facilityName ? facilityName : "Facility Customer"}.
        </Text>
        <Text style={styles.subHeading}>
          1.7 Control of Payments to Agency Staff
        </Text>
        <Text style={styles.content}>
          All Agency Staff providing professional health care staffing services
          are W-2 employees and Agency shall have full and sole control over the
          payment of all compensation to Agency Placements provided to Facility
          Customer under this Agreement. Agency shall have full and sole
          responsibility for the payment or satisfaction of any and all
          applicable state and federal income tax withholding, state and federal
          unemployment and disability insurance withholding and contributions,
          social security tax withholding and contributions, workers
          compensation coverage obligations and any other employment law
          requirements for Placements provided under this Agreement.
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>
          1.8 Regulatory, Policy and Licensing Compliance
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            "Agency shall comply with all applicable state and federal wage and hours laws regarding the payment of overtime and other premiums to Placements.",
            `Agency shall comply with all provisions of the federal Immigration Laws, rules and regulations with respect to hiring, recruiting or referring for employment persons whose authorization for employment in the United States has been verified, and shall provide ${
              facilityName ? facilityName : "Facility Customer"
            } with a copy of such verification required under 8 USCA § 1324a. (Employment verification system)`,
            `Agency represents and warrants that Agency and each Placement providing Services hereunder shall comply with ${
              facilityName ? facilityName : "Facility Customer"
            } and Medical Staff Bylaws, Rules, and Regulations; and the federal, state and local laws, rules and regulations applicable to ${
              facilityName ? facilityName : "Facility Customer"
            } and this Agreement.",
            "Agency represents and warrants that each Placement providing services under this Agreement shall be duly qualified in accordance with the requirements of Exhibit B of this Agreement.`,
            "Agency shall meet or exceed the standards of the Joint Commission on Accreditation of Healthcare Organizations (“TJC”) regarding the use of non-employee healthcare professionals including, but not limited to annual competency validation and performance appraisals.",
            `Agency shall require and assure that Placements shall comply with all policies and procedures of ${
              facilityName ? facilityName : "Facility Customer"
            } including those which pertain to the practice of universal precautions, the reporting of incidents affecting the quality of patient care, and the periodic reporting of specific quality control indicators (including applicable OSHA requirements).`,
            `Agency shall require and assure that Placements cooperate with ${
              facilityName ? facilityName : "Facility Customer"
            } in the investigation of any potentially compensable event, sentinel event, or hospital quality process, including being available for interviews, committee meetings or requests for information from ${
              facilityName ? facilityName : "Facility Customer"
            } in a timely manner.`,
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`• ${item}`}</Text>
          ))}
        </View>

        <Text style={styles.subHeading}>1.9 Agency Representatives</Text>
        <Text style={styles.content}>
          Agency shall employ and assign (i) a licensed or certified health care
          professional employed for purposes of consulting on practice matters
          concerning Placements employed by Agency and (ii) an administrative
          contact who shall be available to{" "}
          {facilityName ? facilityName : "Facility Customer"} twenty-four (24)
          hours per day and who will communicate with the{" "}
          {facilityName ? facilityName : "Facility Customer"}.
        </Text>

        <Text style={styles.subHeading}>1.10 Recruitment Restrictions</Text>
        <Text style={styles.content}>
          Agency’s representatives or employees shall not engage in recruitment
          activities on the premises of{" "}
          {facilityName ? facilityName : "Facility Customer"} for any purpose,
          including the hiring of{" "}
          {facilityName ? facilityName : "Facility Customer"} employees as
          employees of Agency.
        </Text>
        <Text style={styles.subHeading}>1.11 Subcontractors</Text>
        <Text style={styles.content}>
          Agency provides all professional health care staffing services and
          does not utilize subcontractors to provide professional health care
          staffing services.
        </Text>

        <Text style={styles.subHeading}>
          Section 2 – {facilityName ? facilityName : "Facility Customer"}{" "}
          Obligations
        </Text>

        <Text style={styles.subHeading}>
          2.1 Regulatory and Licensing Compliance
        </Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} shall comply with
          the Regulations and represents that it has developed and follows an
          exposure control plan in compliance with the Regulations.
        </Text>

        <Text style={styles.subHeading}>2.2 Orientation</Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} shall provide each
          Placement with such orientation as required, at the sole discretion of{" "}
          {facilityName ? facilityName : "Facility Customer"}, during
          Placement’s first work assignment.
        </Text>

        <Text style={styles.subHeading}>
          2.3 Limitation on Recruitment of Placements
        </Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"}’s representatives
          or employees shall not engage in recruitment activities on the
          premises of {facilityName ? facilityName : "Facility Customer"} for
          any purpose, including the hiring of Agency employees.
        </Text>

        <Text style={styles.subHeading}>2.4 Direct Placement</Text>
        <Text style={styles.content}>
          1. A Direct Placement is a situation where the STAFFING FIRM is hired
          by CLIENT as a recruiter to identify and pre-screen a Candidate for
          any position with the CLIENT, who may then be employed directly by the
          CLIENT, without regard to the previous relationship of the candidate
          to the STAFFING FIRM.
        </Text>
        <Text style={styles.contentWithSpace}>
          2. If CLIENT uses the services of any Assigned Employee or Candidate
          as its direct employee, as an independent contractor, or through any
          person or firm other than STAFFING FIRM during or within twelve (12)
          months after the end of any assignment of the Assigned Employee to
          CLIENT from STAFFING FIRM, CLIENT will be invoice as Direct Placement.
        </Text>
        <Text style={styles.contentWithSpace}>
          3. A Direct Placement is considered successfully completed upon the
          completion of the first day of the employment of the Candidate with
          the CLIENT, following which the STAFFING FIRM will invoice the CLIENT
          for a fee of 18% of the Candidate’s first year salary.
        </Text>

        <Text style={styles.subHeading}>2.5 Request for Services</Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} shall use their
          best efforts to request services within 24 hours or more prior to the
          date and shift of requested services.
        </Text>

        <Text style={styles.subHeading}>
          2.6 Request for Late Call Services
        </Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} request immediate
          services less than 2 hour prior to start of shift. Agency shall be
          paid for the full shift.
        </Text>

        <Text style={styles.subHeading}>2.7 Request to Cancel Services</Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} shall use their
          reasonable best efforts to request to cancel services from Agency at
          least six (6) hours prior to the beginning of the shift for which the
          Placement’s services are required (“Reporting Time”).
        </Text>

        <Text style={styles.subHeading}>2.8 Unsatisfactory Performance</Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} may immediately
          cancel a Placement’s assignment if such{" "}
          {facilityName ? facilityName : "Facility Customer"} is not satisfied
          with the Placement’s professional quality, clinical skills or
          performance; Agency will use its best efforts to find a replacement.
        </Text>

        <Text style={styles.subHeading}>
          2.9 Change in {facilityName ? facilityName : "Facility Customer"}’s
          Needs
        </Text>
        <Text style={styles.content}>
          If, after a Placement reports to a{" "}
          {facilityName ? facilityName : "Facility Customer"} for work, and
          {facilityName ? facilityName : "Facility Customer"} no longer requires
          the Placement’s services as originally requested, the{" "}
          {facilityName ? facilityName : "Facility Customer"} will pay Agency up
          to four (4) hours of the services of the Placement. In such event, the
          {facilityName ? facilityName : "Facility Customer"} reserves the right
          to utilize such Placement in an assignment(s) reasonably consistent
          with his/her license and experience for up to four (4) hours of such
          paid time.
        </Text>

        <Text style={styles.subHeading}>2.10 Safety</Text>
        <Text style={styles.content}>
          In the event of any injury to an Agency Employee while working at the
          customer’s facility,{" "}
          {facilityName ? facilityName : "Facility Customer"} shall take
          immediate action to provide medical attention as necessary, and then
          notify Agency at (469)362-0818. A written report of the event shall
          then be made to Agency by{" "}
          {facilityName ? facilityName : "Facility Customer"}. Agency and{" "}
          {facilityName ? facilityName : "Facility Customer"} agree to cooperate
          in good faith in order to ensure an efficient and safe working
          environment for Agency Employees.
        </Text>
        <View style={{ marginTop: 4 }}></View>
        <Text style={styles.subHeading}>Sentinel Event.</Text>
        <Text style={styles.contentWithSpace}>
          In event of an unexpected incident, error, or sentinel event,{" "}
          {facilityName ? facilityName : "Facility Customer"} shall take
          immediate action and then notify Agency at (469)362-0818. A written
          report of the event shall then be made to Agency by{" "}
          {facilityName ? facilityName : "Facility Customer"}. Agency and{" "}
          {facilityName ? facilityName : "Facility Customer"}
          agree to cooperate in good faith in order to understand, document,
          resolve, and properly report the unexpected incident.
        </Text>
        <Text style={styles.subHeading}>
          Section 3 – Service Charges and Billing
        </Text>
        <Text style={styles.subHeading}>3.1 Billing Schedule</Text>
        <Text style={styles.content}>
          Agency shall invoice{" "}
          {facilityName ? facilityName : "Facility Customer"} on a weekly basis
          for all Services provided under this Agreement.{" "}
          {facilityName ? facilityName : "Facility Customer"} shall pay Agency
          within Net Fifteen (15) days of receipt of an undisputed invoice. If
          any sums due to Agency are not paid within the Net 15, interest shall
          accrue thereon at the rate of 5% per month until paid in full. All
          December invoices shall be paid no later than the second week of
          January the following year. Any action to collect any sums due under
          this Agreement may be brought in Texas, and the parties consent to
          jurisdiction and venue in such County. In any action or proceeding to
          enforce or construe this Agreement, the prevailing party shall be
          entitled to recover their actual attorney’s fees and cost.
        </Text>

        <Text style={styles.subHeading}>3.2 Billing Documentation Format</Text>
        <Text style={styles.content}>
          Invoices and work assignment sign-in forms prepared by Agency for
          {facilityName ? facilityName : "Facility Customer"} shall include, but
          not be limited to, the following information: Date of Service,
          Placement Name, Department or Cost Center of Assignment,
          Classifications, Shift Worked, number of regular hours and rate
          billed, number of approved overtime hours worked and rate billed, and
          total amount due to Agency.
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>3.3 Hourly Rate</Text>
        <Text style={styles.content}>
          {facilityName ? facilityName : "Facility Customer"} shall pay Agency
          the hourly rate for each Placement provided by Agency as specifically
          detailed in the Payment Schedule attached hereto as Exhibit A and
          incorporated by this reference.
        </Text>

        <Text style={styles.subHeading}>3.4 Overtime and Holiday Rates</Text>
        <Text style={styles.content}>
          Overtime Rate Obligation - Overtime hours will be billed in accordance
          with this Agreement. Overtime hours will be defined as follows:
          {facilityName ? facilityName : "Facility Customer"} will pay 1.5 times
          the regular rate for all hours worked in excess of forty (40) hours in
          one work week.
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            `In the State of California the ${
              facilityName ? facilityName : "Facility Customer"
            } will pay 1.5 times the regular rate for all hours worked in excess of forty (40) hours in one work week or in excess of eight (8) hours in one work day.`,
            `${
              facilityName ? facilityName : "Facility Customer"
            } will pay a six (6) hour minimum for an eight (8) hour shift and eight (8) hour minimum applies for a twelve (12) hour shift per diem rate and for Request to Cancel Services.`,
            `${
              facilityName ? facilityName : "Facility Customer"
            } will pay 1.5 times the regular rate for Late Call Services.`,
            `${
              facilityName ? facilityName : "Facility Customer"
            } will pay holiday rates, according to Exhibit A, of 1.5 times the appropriate Base Rate for each hour worked by a Placement during the holidays.`,
            "Official holidays, for purposes of this Agreement, include:",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`• ${item}`}</Text>
          ))}
          <View style={{ marginLeft: 10 }}>
            {[
              "New Year’s Eve",
              "New Year’s Day",
              "Memorial Day",
              "Fourth of July",
              "Labor Day",
              "Thanksgiving Day",
              "Christmas Eve",
              "Christmas Day",
            ].map((item, index) => (
              <Text key={index} style={styles.listItem}>{`- ${item}`}</Text>
            ))}
          </View>
        </View>
        <View style={{ marginTop: "6px" }}>
          <Text style={styles.subHeading}>3.5 Audit</Text>
        </View>
        <Text style={styles.content}>
          A {facilityName ? facilityName : "Facility Customer"} shall notify
          Agency in writing of the Facility Customer’s request to audit the
          billing and reimbursement records of Agency. Agency shall cooperate
          with any such audit request, and shall provide such{" "}
          {facilityName ? facilityName : "Facility Customer"} with access to any
          Agency documents reasonably requested by such{" "}
          {facilityName ? facilityName : "Facility Customer"} within ten (10)
          days of such request. In the event that a{" "}
          {facilityName ? facilityName : "Facility Customer"} identifies any
          inaccurate billings, and provides Agency with written documentation of
          the billing errors, Agency shall respond to the{" "}
          {facilityName ? facilityName : "Facility Customer"}
          within thirty (30) days of such notice with documentation of the
          corrective action to be taken by Agency, including but not limited to
          (i) adjustment of current billing invoice(s), and (ii) the refund of
          any dollars due back to the{" "}
          {facilityName ? facilityName : "Facility Customer"}.
        </Text>

        <Text style={styles.subHeading}>
          Section 4 – General Terms and Conditions
        </Text>

        <Text style={styles.subHeading}>4.1 Term and Termination</Text>
        <Text style={styles.content}>
          This Agreement will be in effect from the date of signature of both
          parties for one year and shall continue in full force, from year to
          year and automatically renew annually.
        </Text>

        <Text style={styles.subHeading}>4.2 Termination of the Agreement</Text>
        <Text style={styles.content}>
          This Agreement shall terminate upon the first to occur of the
          following events:
        </Text>
        <View style={{ marginTop: 5 }}>
          {[
            `at the election of Agency, if ${
              facilityName ? facilityName : "Facility Customer"
            } commits a material breach of this Agreement or otherwise fails to fulfill its obligations to Agency hereunder and ${
              facilityName ? facilityName : "Facility Customer"
            } does not cure such breach or default within thirty (30) days after the giving of written notice thereof to {facilityName ? facilityName : "Facility Customer"} by Agency`,
            `at the election of ${
              facilityName ? facilityName : "Facility Customer"
            }, if Agency commits a material breach of this Agreement or otherwise fails to fulfill its obligations to ${
              facilityName ? facilityName : "Facility Customer"
            } hereunder and Agency does not cure such breach or default within thirty (30) days after the giving of written notice thereof to Agency by ${
              facilityName ? facilityName : "Facility Customer"
            }`,
            "upon thirty (30) days prior written notice without cause to the other party",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`• ${item}`}</Text>
          ))}
        </View>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>4.3 Indemnification</Text>
        <View style={{ marginTop: 5 }}>
          {[
            `${
              facilityName ? facilityName : "Facility Customer"
            } agrees to promptly and fully defend, indemnify and hold harmless Embracing Hands Healthcare Staffing, its officers, agents, directors, trustees, and employees against all third party claims, liabilities, demands, and judgments, (including reasonable attorney’s fees and expenses incurred in the defense thereof) made or recovered against them for damages to any real or tangible property, or for personal injuries or death ('Damages') arising out of the acts or omissions in connection with the duties and services provided under this Agreement by Agency, its employees and subcontractors.`,
            `${
              facilityName ? facilityName : "Facility Customer"
            } agrees to promptly and fully defend, indemnify and hold harmless Embracing Hands Healthcare Staffing, its officers, agents, directors, trustees, and employees against all third party claims, liabilities, demands, and judgments, (including reasonable attorney’s fees and expenses incurred in the defense thereof) made or recovered against them for damages due to employment practices claims, including, but not limited to, allegations of wrongful termination, employment discrimination, harassment, and/or retaliatory treatment, arising out of the acts or omissions in connection with the duties and services provided under this Agreement.`,
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`• ${item}`}</Text>
          ))}
        </View>

        <Text style={styles.subHeading}>4.4 Insurance</Text>
        <Text style={styles.content}>Agency shall provide:</Text>
        <View style={{ marginTop: 5 }}>
          {[
            "Worker’s Compensation Insurance for each Placement in compliance with the laws and statutes of the jurisdiction in which the work is performed. Such insurance shall include Employers’ Liability Insurance with a limit of not less than One Hundred Thousand Dollars ($100,000) for each occurrence.",
            "Professional Liability Insurance which shall provide coverage for any acts or omissions of Agency, Agency’s employees and Placements with respect to professional negligence which may have occurred during the relevant term. Said policies of insurance shall be written with limits of liability of no less than One Million Dollars ($1,000,000) per claim/Three Million Dollars ($3,000,000) annual aggregate for 'claims made' insurance coverage. Agency further agrees that it shall maintain 'continuous coverage,' as defined by this Section, for the entire relevant term. The relevant term shall commence with the effective date of this Agreement and shall continue through the effective term of this Agreement.",
            "General Liability Insurance for itself and all Placements in an amount not less than One Million",
          ].map((item, index) => (
            <Text key={index} style={styles.listItem}>{`${
              index + 1
            }. ${item}`}</Text>
          ))}
        </View>
        <Text style={styles.content}>
          Dollars ($1,000,000) combined single limit, each occurrence; including
          personal injury and blanket contractual liability.
        </Text>
        <Text style={styles.content}>
          Certificates evidencing such insurance coverage for all Placements
          shall be provided to{" "}
          {facilityName ? facilityName : "Facility Customer"} prior to the
          execution of this Agreement. In the event of modification,
          termination, expiration or cancellation of any of the aforesaid
          policies of insurance, insurer and Agency shall provide{" "}
          {facilityName ? facilityName : "Facility Customer"} written notice
          thereof within thirty (30) business days of Agency’s receipt of such
          notification from any of its insurers.
        </Text>

        <Text style={styles.subHeading}>4.5 Notices</Text>
        <Text style={styles.content}>
          Notices required or permitted to be given must be in writing and shall
          be deemed given only if delivered personally or sent by next business
          day courier service, facsimile, or by registered or certified mail,
          postage prepaid, as follows:
        </Text>

        <Text style={styles.subHeading}>4.6 Independent Contractor</Text>
        <Text style={styles.content}>
          No relationship of employment, partnership, joint venture or agency is
          created or intended to be created by this Agreement and that Agency,
          nor Placements have any claim under this Agreement against Facility
          Customer for vacation pay, sick leave, retirement benefits, social
          security, workers’ compensation, disability or unemployment insurance
          benefits, damages as a result of employment practice claims including,
          but not limited to, claims for wrongful termination, sexual
          harassment, employment discrimination and/or retaliatory treatment, or
          employee benefits of any kind.
        </Text>
        <Text style={styles.content}>
          If {facilityName ? facilityName : "Facility Customer"} uses the
          services of any Assigned Employee as its direct employee, as an
          independent contractor, or through any person or agency other the
          Staffing Agency during or end of assignment of the assigned Placement
          to {facilityName ? facilityName : "Facility Customer"} from Staffing
          Agency, Facility customer must notify the Agency immediately to
          discuss.
        </Text>

        <Text style={styles.subHeading}>4.7 Nondiscrimination</Text>
        <Text style={styles.content}>
          Neither Agency, nor{" "}
          {facilityName ? facilityName : "Facility Customer"} shall discriminate
          against any person because of race, color, religion, sex, marital
          status, national origin, age, physical handicap or medical condition
          in the provision of Services hereunder.
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>4.8 Dispute Resolution</Text>
        <Text style={styles.content}>
          Any dispute arising out of or relating to this Agreement, including
          the breach, termination or validity thereof, shall be finally resolved
          by arbitration in accordance with the CPR Institute for Dispute
          Resolution Rules for Non-Administered Arbitration in effect on the
          date of this agreement by a sole arbitrator. The arbitration shall be
          governed by the Texas Arbitration Act and judgment upon the award
          rendered by the arbitrator may be entered by any court having
          jurisdiction thereof. The place of arbitration shall be Texas.
        </Text>

        <Text style={styles.subHeading}>4.9 Force Majeure</Text>
        <Text style={styles.content}>
          Neither party shall be liable nor deemed to be in default for any
          delay, interruption or failure in performance under this Agreement
          caused by or resulting, directly or indirectly, from Acts of God,
          civil or military authority, war, terrorism, vandalism, riots, civil
          disturbances, accidents, fires, explosions, earthquakes, floods,
          failure of transportation infrastructure, disruption of public
          utilities, supply chain interruptions, breakdown of machinery, strike
          or other work interruptions by either party’s employees, or any
          similar cause beyond the reasonable control of either party. However,
          both parties shall make good faith efforts to perform under this
          Agreement in the event of any such circumstances.
        </Text>

        <Text style={styles.subHeading}>4.10 Severability</Text>
        <Text style={styles.content}>
          In the event any part of this Agreement is declared invalid, such
          invalidity will not affect the validity of the remainder of the
          Agreement.
        </Text>

        <Text style={styles.subHeading}>4.11 Modification and Amendments</Text>
        <Text style={styles.content}>
          Except as otherwise expressly set forth in this Agreement, this
          Agreement may be modified or amended only by written agreement
          executed by Agency and{" "}
          {facilityName ? facilityName : "Facility Customer"}. In the event of a
          conflict, the terms and conditions of this Agreement will take
          precedence over those of any purchase order or similar document.
          Notwithstanding the foregoing, Exhibit A may be amended by Agency in
          Agency’s sole discretion upon written notice to{" "}
          {facilityName ? facilityName : "Facility Customer"}.
        </Text>

        <Text style={styles.subHeading}>4.12 Governing Laws</Text>
        <Text style={styles.content}>
          This Agreement shall be governed by, construed, and enforced in
          accordance with the internal laws of the State of Texas and not the
          law of conflicts.
        </Text>

        <Text style={styles.subHeading}>4.13 Public Laws</Text>
        <Text style={styles.content}>
          In accordance with Public Law 96-499, enacted December 5, 1980,
          Agency, certifies that until the expiration of four (4) years after
          the furnishing of the above services, Agency, shall make available,
          upon written request to the Secretary of the Department of Health and
          Human Resources or the Comptroller General of the United States, or
          any of their duly authorized representatives, and pursuant to the
          regulations of the Secretary of the Department of Health and Human
          Services, the Agreement, and the books, documents and records of
          Agency that are necessary to certify the nature and extent of such
          costs. If Agency enters into a subcontract for services to be rendered
          hereunder with a related party, which
        </Text>
        <Text style={styles.subHeading}>4.14 Entire Agreement</Text>
        <Text style={styles.content}>
          This Agreement (including Exhibits A, B, and C) supersedes all
          previous contracts and constitutes the entire Agreement of whatsoever
          kind or nature existing between or among the parties respecting the
          subject matter within, and no party shall be entitled to benefits
          other than those specified herein. As between or among the parties, no
          oral statements or prior written material not specifically
          incorporated herein shall be of any force or effect. The parties
          specifically acknowledge that in entering into and executing this
          Agreement, the parties are relying solely upon the representation and
          agreement contained in this Agreement and no others. All prior
          representations or agreements, whether written or verbal, not
          expressly incorporated herein are superseded and no changes in or
          additions to this Agreement shall be recognized unless and until made
          in writing and signed by all parties hereto.
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>4.15 Confidentiality</Text>
        <Text style={styles.content}>
          Each party acknowledges that, as a result of this Agreement, it will
          gain access to certain Confidential Information of the other parties.
          “Confidential Information” means, with respect to any party, the terms
          of this Agreement and any technical or non-technical information
          related to the past, current or proposed operations, products,
          technology, services and business of such party (the “Disclosing
          Party”) disclosed or otherwise made available in any manner by such
          party to another party (the “Receiving Party”), or to which the
          Receiving Party may gain access in the performance of this Agreement,
          whether disclosed orally, visually or in writing, and whether or not
          bearing any legend or marking indicating that such information or data
          is confidential, including{" "}
          {facilityName ? facilityName : "Facility Customer"} materials,
          know-how, processes, trade secrets, manuals, confidential reports,
          services rendered by{" "}
          {facilityName ? facilityName : "Facility Customer"}, procedures and
          methods preferred by a
          {facilityName ? facilityName : "Facility Customer"}’s patients,
          individually identifiable health information (as defined under HIPAA)
          and derivatives thereof, fees paid by patients, financial and
          operational information, and other matters relating to the operation
          of {facilityName ? facilityName : "Facility Customer"}’s business;
          Agency’s trade secrets, know-how, inventions, techniques, processes,
          programs, schematics, software source documents, data, confidential
          reports, {facilityName ? facilityName : "Facility Customer"} lists,
          financial information, manuals, sales and marketing plans; or other
          information which any party knows or has reason to know is
          confidential information of any other party. Confidential Information
          also includes proprietary or confidential information of any third
          party that may be in the Disclosing Party’s possession.
        </Text>
        <Text style={styles.content}>
          Each party shall (a) hold the other party’s Confidential Information
          in confidence, using the same degree (but no less than a reasonable
          degree) of care and protection that it exercises with its own
          Confidential Information, during the term of this Agreement; (b) not
          directly or indirectly disclose, copy, distribute, republish or allow
          access to any Confidential Information of any party to a third party;
          and (c) not use any party’s Confidential Information for any purpose
          other than as necessary to fulfill such party’s obligations or
          exercise its rights under this Agreement. Notwithstanding the above:
          {facilityName ? facilityName : "Facility Customer"} may disclose
          Agency’s Confidential Information to employees and agents of{" "}
          {facilityName ? facilityName : "Facility Customer"} as Authorized
          Users of
          {facilityName ? facilityName : "Facility Customer"}; and Agency may
          disclose {facilityName ? facilityName : "Facility Customer"}’s
          Confidential Information to Agency’s employees who have a need to
          know; and any party may disclose Confidential Information if so
          required by law or regulation (including court order or subpoena or
          other governmental decree or authority), provided that the Receiving
          Party, if required by governmental authority to reveal Confidential
          Information of the Disclosing Party will, if allowed by law, notify
          the Disclosing Party promptly upon learning of the government
          requirements and before making such disclosure, and will provide the
          Disclosing Party with an opportunity (at the Disclosing Party’s own
          expense) to resist such disclosure or to seek a protective order or
          other appropriate procedure so that the disclosure, if required, can
          be made in a manner than preserves the confidentiality of the
          Confidential Information.
        </Text>
        <Text style={styles.content}>
          No party hereto will be liable for the reproduction, disclosure or use
          of any Confidential Information, other than patient-related data, if
          such information is: (a) publicly available or later becomes publicly
          available other than through a breach of this Agreement; (b) known to
          the Receiving Party or their respective employees, agents or
          subcontractors prior to such disclosure; (c) independently developed
          by the Receiving Party, or their respective employees, agents or
          subcontractors, without the benefit of access, directly or indirectly,
          to Confidential Information of the Disclosing Party; or (d)
          subsequently lawfully obtained by the Receiving Party, or their
          respective employees, agents or subcontractors, from a third party
          without obligation of confidentiality. The information furnished to
          any party hereunder will only be used and reproduced in connection
          with that party’s rights and obligations under this Agreement. The
          provisions of this Article will survive beyond the expiration or
          termination of this Agreement.
        </Text>
        <Text style={styles.content}>
          • Unless otherwise authorized, upon the earlier of termination of this
          Agreement or request of the Disclosing Party, the Receiving Party will
          promptly return to the Disclosing Party the Disclosing Party's
          Confidential Information.
        </Text>
        <Text style={styles.content}>
          • The parties hereto acknowledge and agree that they will, upon
          learning of: (a) any unauthorized disclosure or use of another party’s
          Confidential Information; or (b) any requirement that a party disclose
          another party’s Confidential Information by operation of law,
          regulation or other legal process, notify such party promptly and in
          writing, and cooperate fully with such other party to protect such
          party’s Confidential Information.
        </Text>
        <Text style={styles.content}>
          • HIPAA Compliance. For purposes of this Agreement, Placements shall
          be considered “work force members,” defined as an individuals who are
          given access to Hospital’s protected health information (“PHI”), which
          means any information whether oral or recorded in any form or medium,
          created or received by Placements and: (i) that relates to the past,
          present or future physical or mental condition of the patient; the
          provision of health care to the patient; or the past, present or
          future payment for the provision of health care to the patient; and
          (ii) that identifies the individual or with respect to which there is
          a reasonable basis to believe the information can be used to identify
          the patient and shall have the same meaning as the term “protected
          health information” in 45 CFR 164.501. As members of the work force,
          Placements will be required to participate in certain education and
          training related to security and protection of PHI.
        </Text>
        <Text style={styles.subHeading}>4.16 Records:</Text>
        <Text style={styles.content}>
          Agency shall maintain complete and accurate records and documentation
          concerning all Services performed under this Agreement and shall from
          time to time, at the request of{" "}
          {facilityName ? facilityName : "Facility Customer"} provide Facility
          Customer with complete copies of such records and documents.
        </Text>

        <Text style={styles.subHeading}>
          4.17 Required Contractual Reporting Documentation:
        </Text>
        <Text style={styles.content}>
          Agency shall cooperate with{" "}
          {facilityName ? facilityName : "Facility Customer"} and provide
          documentation as reasonably requested by{" "}
          {facilityName ? facilityName : "Facility Customer"} related to
          Services provided hereunder in a form and format acceptable to
          {facilityName ? facilityName : "Facility Customer"}. The required
          documentation shall be provided to
          {facilityName ? facilityName : "Facility Customer"} no later than 15
          days after request by Facility Customer.
        </Text>

        <Text style={styles.content}>
          In Witness Whereof, the parties have caused this Agreement to be
          executed by their duly authorized officers or delegates, as of the day
          and year first written above (Contract, Customer Complaint and Letter
          of Understanding).
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>If to Agency:</Text>
        <Text style={styles.content}>
          Embracing Hands Healthcare Staffing{"\n"}
          PO BOX 786{"\n"}
          Little Elm, Texas 75068{"\n"}
          469-362-0818
        </Text>

        <Text style={styles.subHeading}>
          If to {facilityName ? facilityName : "Facility Customer"}:
        </Text>
        <Text style={styles.content}>
          Facility Customer:
          {facilityName
            ? facilityName
            : " _____________________________________________"}
          {"\n"}
          Address:
          {profile?.address
            ? profile.address
            : "_____________________________________________________"}
          {"\n"}
          {/* City, State, Zip Code:
          {profile ? location : "__________________________________________"} */}
          {/* {"\n"} */}
          <Text style={styles.signatureLabel}>Signature: {"\n"}</Text>
          {profile?.contractSignatureUrl ? (
            <Image
              style={styles.signature}
              src={profile.contractSignatureUrl}
            />
          ) : (
            <Text style={styles.content}>
              _____________________________________________________
            </Text>
          )}
          {"\n\n\n\n"}
          Date:{" "}
          {profile?.createdAt
            ? format(profile.createdAt, "yyyy-MM-dd")
            : "_________________________________"}
        </Text>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>Exhibit B</Text>
        <Text style={styles.subHeading}>
          Related Experience and Additional Certifications
        </Text>

        <Text style={styles.subHeading}>Critical Care RNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year of acute Critical Care Experience
          </Text>
          <Text style={styles.listItem}>
            • Passing Score on Critical Care Examination
          </Text>
          <Text style={styles.listItem}>• Current ACLS</Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>

        <Text style={styles.subHeading}>Telemetry RNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year of acute care experience in Telemetry/Cardiac
            monitored areas
          </Text>
          <Text style={styles.listItem}>
            • Passing Score on Telemetry/Cardiac Care Examination
          </Text>
          <Text style={styles.listItem}>• Current ACLS</Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>

        <Text style={styles.subHeading}>Medical-Surgical RNs and LVNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year of acute care experience in Medical-Surgical
            nursing
          </Text>
          <Text style={styles.listItem}>
            • Passing Score on Medical-Surgical Examination
          </Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>

        <Text style={styles.subHeading}>Operating Room technician:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year of surgical scrub experience in an acute care
            hospital or outpatient surgery center setting
          </Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>

        <Text style={styles.subHeading}>
          Certified Nursing Assistant (CNA):
        </Text>
        <View>
          <Text style={styles.listItem}>• Current certification</Text>
          <Text style={styles.listItem}>
            • Minimum of 6 months of experience in acute care setting or 1 year
            experience in long term care setting
          </Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>
      </ContractPage>
      <ContractPage>
        <Text style={styles.subHeading}>Pediatric RNs and LVNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year acute care pediatric experience
          </Text>
          <Text style={styles.listItem}>
            • Passing score on Pediatric examination
          </Text>
          <Text style={styles.listItem}>• Current PALS and BLS</Text>
        </View>

        <Text style={styles.subHeading}>
          Post-partum / normal newborn RNs and LVNs:
        </Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year post-partum / normal newborn experience
          </Text>
          <Text style={styles.listItem}>
            • Passing score on post-partum / normal newborn examination
          </Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>

        <Text style={styles.subHeading}>Labor and Delivery RNs and LVNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year Labor and delivery experience
          </Text>
          <Text style={styles.listItem}>
            • Passing score on Labor and Delivery examination
          </Text>
          <Text style={styles.listItem}>
            • Current BLS, ACLS and NALS or NRP
          </Text>
        </View>

        <Text style={styles.subHeading}>Neonatal Intensive Care Unit RNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year neonatal intensive care unit experience
          </Text>
          <Text style={styles.listItem}>
            • Passing score on NICU examination
          </Text>
          <Text style={styles.listItem}>• Current BLS and NALS or NRP</Text>
        </View>

        <Text style={styles.subHeading}>Operating Room RNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year scrub (and circulating for RNs) experience in
            an acute care or outpatient surgery setting
          </Text>
          <Text style={styles.listItem}>• Current BLS</Text>
        </View>

        <Text style={styles.subHeading}>Emergency Services RNs and LVNs:</Text>
        <View>
          <Text style={styles.listItem}>
            • Minimum of one year of acute hospital emergency department
            experience
          </Text>
          <Text style={styles.listItem}>• Current BLS and ACLS</Text>
        </View>
      </ContractPage>
    </Document>
  );
};

export default Contract;
