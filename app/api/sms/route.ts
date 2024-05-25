import { smsProvider } from "@/app/providers/smsProvider";
import { NextRequest, NextResponse } from "next/server";

interface SendSMSData {
    senderName: string;
    phoneNumber: string;
    text: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as SendSMSData[];

    for (let item of data) {
        if (!item.senderName || !item.phoneNumber || !item.text) {
            return NextResponse.json({
              status: 500,
              statusText: "Missing data for sending sms",
            });
          }
    }

    const send = await smsProvider.sendBatchSMS(data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500, statusText: error.message }
    );
  }
}
