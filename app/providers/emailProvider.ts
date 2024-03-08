const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];

apiKey.apiKey = process.env.BREVO_API_KEY;

interface NewApplicationRequest {
  websiteUrl: string;
}

interface ApplicationRequestApproved {
  name: string;
}

interface ApplicationRequestRejected {
  name: string;
}

interface ApplicationEmailToFacility {
  name: string;
  jobPostId: string;
  message: string;
  email: string;
}

type EmailParams<T extends EmailTemplate> =
  T extends EmailTemplate.NEW_APPLICATION_REQUEST
    ? NewApplicationRequest
    : T extends EmailTemplate.APPLICATION_REQUEST_APPROVED
    ? ApplicationRequestApproved
    : T extends EmailTemplate.APPLICATION_REQUEST_REJECTED
    ? ApplicationRequestRejected
    : T extends EmailTemplate.APPLICATION_EMAIL_TO_FACILITY
    ? ApplicationEmailToFacility
    : {};

export enum EmailTemplate {
  NEW_APPLICATION_REQUEST = 1,
  APPLICATION_REQUEST_APPROVED = 2,
  APPLICATION_REQUEST_REJECTED = 3,
  APPLICATION_EMAIL_TO_FACILITY = 4,
}

interface SendEmailWithTemplate {
  emailTo: string;
  emailTemplateId: EmailTemplate;
  emailParams: EmailParams<EmailTemplate>;
}

interface SendJobPostEmail {
  emailTo: string;
  emailTemplateId: EmailTemplate;
  emailParams: EmailParams<EmailTemplate>;
}

class EmailProvider {
  async sendEmailWithTemplate(data: SendEmailWithTemplate) {
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail = {
      to: [
        {
          email: data.emailTo,
          name: "Embracing Hands Staffing",
        },
      ],
      templateId: data.emailTemplateId,
      params: data.emailParams,
    };

    return apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  async sendEmailDirectly({
    emailTo,
    subject,
    content,
  }: {
    emailTo: string;
    subject: string;
    content: string;
  }) {
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail = {
      sender: {
        email: "admin@colexsoftwaresolutions.com",
        name: "Embracing Hands Staffing",
      },
      to: [{ email: emailTo }],
      subject: subject,
      htmlContent: content,
    };

    return apiInstance.sendTransacEmail(sendSmtpEmail);
  }
<<<<<<< HEAD

  async sendJobPostEmail(data: SendJobPostEmail) {
    const { emailTo, emailTemplateId, emailParams } = data;

    this.sendEmailWithTemplate({
      emailTo,
      emailTemplateId,
      emailParams,
    });
  }
=======
>>>>>>> 9e98d4b9 (added email sending and middleware routes protection)
}

export const emailProvider = new EmailProvider();
