import { EmailTemplate, emailProvider } from "@/app/providers/emailProvider";
import { userProvider } from "@/app/providers/userProvider";
import { adminTestEmail } from "@/lib/utils";
import { Role } from "@prisma/client";

const getUserProfileName = async (id: string, role: Role): Promise<string> => {
  if (role === "STAFF") {
    const userProfile = await userProvider.getStaffProfileById(id);

    if (!userProfile || !userProfile.staffProfile) {
      throw new Error("Could not find staff user profile");
    }
    return userProfile.staffProfile.firstname;
  }

  const userProfile = await userProvider.getFacilityProfileById(id);
  if (!userProfile) {
    throw new Error("Could not find facility user profile");
  }
  return userProfile?.facilityProfile?.name || "";
};

interface RequestBody {
  id: string;
  status: "APPROVED" | "REJECTED";
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    const user = await userProvider.updateUserStatus(body.id, body.status);
    const userProfileName = await getUserProfileName(body.id, user.role);

    if (body.status === "APPROVED") {
      await emailProvider.sendEmailWithTemplate({
        emailTo: process.env.ADMIN_EMAIL || adminTestEmail,
        emailTemplateId: EmailTemplate.APPLICATION_REQUEST_APPROVED,
        emailParams: {
          name: userProfileName,
        },
      });
    }
    if (body.status === "REJECTED") {
      await emailProvider.sendEmailWithTemplate({
        // emailTo: user.email,
        emailTo: process.env.ADMIN_EMAIL || adminTestEmail,
        emailTemplateId: EmailTemplate.APPLICATION_REQUEST_REJECTED,
        emailParams: {
          name: userProfileName,
        },
      });
    }
    return new Response(JSON.stringify({ success: true, user }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, error }));
  }
}

export async function DELETE(request: Request) {
  const body: RequestBody = await request.json();

  try {
    await userProvider.archiveUser(body.id);

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error("Error archiving user:", error);
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
}
