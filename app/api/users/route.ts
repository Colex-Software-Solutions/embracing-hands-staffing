import { EmailTemplate, emailProvider } from "@/app/providers/emailProvider";
import { userProvider } from "@/app/providers/userProvider";
import { Role } from "@prisma/client";

const getUserProfileName = async (id: string, role: Role): Promise<string> => {
  if (role === "STAFF") {
    const userProfile = await userProvider.getStaffProfileById(id);
    console.log({ userProfile });

    if (!userProfile || !userProfile.staffProfile) {
      throw new Error("Could not find staff user profile");
    }
    return userProfile.staffProfile.firstname;
  }

  const userProfile = await userProvider.getFacilityProfileById(id);
  if (!userProfile || !userProfile.facilityProfile) {
    throw new Error("Could not find staff user profile");
  }
  return userProfile.facilityProfile.name;
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
        // emailTo: user.email,
        emailTo: "admin@colexsoftwaresolutions.com",
        emailTemplateId: EmailTemplate.APPLICATION_REQUEST_APPROVED,
        emailParams: {
          name: userProfileName,
        },
      });
    }
    if (body.status === "REJECTED") {
      await emailProvider.sendEmailWithTemplate({
        // emailTo: user.email,
        emailTo: "admin@colexsoftwaresolutions.com",
        emailTemplateId: EmailTemplate.APPLICATION_REQUEST_REJECTED,
        emailParams: {
          name: userProfileName,
        },
      });
    }
    return new Response(JSON.stringify({ success: true, user }));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }));
  }
}
