import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "../../../components/ui/dialog";
import { useToast } from "../../../components/ui/use-toast";
import axios from "axios";
import { JobApplication, JobPost, StaffProfile, User } from "@prisma/client";
import { z } from "zod";
import StaffCombobox from "../combobox/staff-combobox";

const AssignStaffToJobSchema = z.object({
  staff: z.string().min(1, "Please select a staff"),
});
type AssignStaffToJobFormValues = z.infer<typeof AssignStaffToJobSchema>;

interface AssignStaffToJobModalProps {
  jobId: string;
}

interface StaffUser extends User {
  staffProfile: StaffProfile;
}

interface JobPostApplication extends JobApplication {
  staffProfile: StaffProfile;
}

interface Job extends JobPost {
  applications: JobPostApplication[];
}

const mapUsersToStaff = (users: StaffUser[]): StaffProfile[] =>
  users.map((user) => user.staffProfile).filter((user) => user !== null);

const getCurrentlyAssignedStaff = (jobPost?: Job) =>
  jobPost && jobPost.applications && jobPost.applications.length > 0
    ? `This job is currenlty assigned to ${jobPost.applications[0].staffProfile.firstname} ${jobPost.applications[0].staffProfile.lastname}`
    : "This job is currently NOT assigned to any staff";

function AssignStaffToJobModal({ jobId }: AssignStaffToJobModalProps) {
  const [jobPost, setJobPost] = useState<Job>();
  const [staff, setStaff] = React.useState<StaffProfile[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const { toast } = useToast();

  const fetchJobPost = async () => {
    try {
      const response = await axios.get(`/api/job-post/${jobId}`);
      const job = response.data.jobPost;

      setJobPost(job);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to fetch data",
      });
    }
  };

  const fetchStaffUsers = async () => {
    try {
      const response = await axios.get("/api/staff");
      const staffUsers = response.data as StaffUser[];

      setStaff(mapUsersToStaff(staffUsers));
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failed to fetch data",
      });
    }
  };

  useEffect(() => {
    fetchJobPost();
    fetchStaffUsers();
  }, [jobId]);

  const defaultValues: Partial<AssignStaffToJobFormValues> = {
    staff: "",
  };
  const form = useForm<AssignStaffToJobFormValues>({
    resolver: zodResolver(AssignStaffToJobSchema),
    defaultValues,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = form.getValues();
    const staffProfile = staff.find(
      (staffProfile) =>
        `${staffProfile.firstname} ${staffProfile.lastname}`.toLowerCase() ===
        formValues.staff
    );

    if (!staffProfile) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Staff could not be assigned at this time.",
      });

      return;
    }

    try {
      const response = await axios.post(
        `/api/job-post/${jobId}/assign-staff-to-job`,
        {
          staffProfileId: staffProfile.id,
        }
      );

      if (response && response.data.success) {
        toast({
          variant: "default",
          title: "Success!",
          description: "Staff has been successfully assigned.",
        });

        form.reset();
        setIsOpen(false);
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            response.data.message ||
            "Staff could not be assigned at this time.",
        });
      }
    } catch (error) {
      console.log("Error", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Staff could not be assigned at this time.",
      });
    }
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal hover:bg-green-600 hover:text-white"
          variant="outline"
        >
          Assign Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                Assign staff{jobPost && `: ${jobPost.title}`}
              </DialogTitle>
              <DialogDescription>
                {jobPost && getCurrentlyAssignedStaff(jobPost)}
              </DialogDescription>
            </DialogHeader>
            <br />
            <FormField
              control={form.control}
              name="staff"
              render={({ field }) => (
                <FormItem className="flex gap-5 items-center">
                  <FormLabel>Assign Staff</FormLabel>
                  <FormControl>
                    <StaffCombobox
                      value={field.value}
                      onChange={field.onChange}
                      staffProfiles={staff}
                    />
                  </FormControl>
                  {errors.staff && (
                    <FormMessage>{errors.staff.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex justify-center gap-5 my-5">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="default"
                className="bg-green-600 hover:bg-green-400"
              >
                Yes, Approve
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export default AssignStaffToJobModal;
