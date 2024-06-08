import { StaffUser } from "./page";

export const mapDataToStaffUsers = (data: any): StaffUser[] => {
  const staffUsers: StaffUser[] = data.map((staffUserData: any) => {
    return {
      id: staffUserData.id,
      firstName: staffUserData.staffProfile?.firstname || "N/A",
      lastName: staffUserData.staffProfile?.lastname || "N/A",
      email: staffUserData.email,
      status: staffUserData.status,
      phone: staffUserData.phone,
    };
  });

  return staffUsers;
};
