const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

interface SendSMSData {
  senderName: string;
  phoneNumber: string;
  text: string;
}

class SmsProvider {
  async sendSMS(data: SendSMSData) {
      client.messages.create({
        body: data.text,
        messagingServiceSid: "MG4cbbaacd8d1f9ef7a78884af458af233",
        to: data.phoneNumber,
      });
    }

    async sendBatchSMS(messages: SendSMSData[]) {
      const messagePromises = messages.map(message => this.sendSMS(message));
      return Promise.all(messagePromises);
    }
}

export const smsProvider = new SmsProvider();
