const SibApiV3Sdk = require("@getbrevo/brevo");
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];

apiKey.apiKey = process.env.BREVO_API_KEY;

interface NewApplicationRequest {
  name: string;
  role: string;
  websiteUrl: string;
}

interface ApplicationRequestApproved {
  name: string;
}

interface ApplicationRequestRejected {
  name: string;
}

type EmailParams<T extends EmailTemplate> =
  T extends EmailTemplate.NEW_APPLICATION_REQUEST
    ? NewApplicationRequest
    : T extends EmailTemplate.APPLICATION_REQUEST_APPROVED
    ? ApplicationRequestApproved
    : T extends EmailTemplate.APPLICATION_REQUEST_REJECTED
    ? ApplicationRequestRejected
    : {};

export enum EmailTemplate {
  NEW_APPLICATION_REQUEST = 1,
  APPLICATION_REQUEST_APPROVED = 2,
  APPLICATION_REQUEST_REJECTED = 3,
}

interface SendEmailWithTemplate {
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
}

export const emailProvider = new EmailProvider();
