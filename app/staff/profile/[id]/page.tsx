/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qJbBwFNpBGj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/app/components/ui/card";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";

export default function StaffProfileEdit() {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <Card className="w-full max-w-3xl py-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input id="firstname" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input id="lastname" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              className="min-h-[100px]"
              id="about"
              placeholder="Enter your professional summary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter your job title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" placeholder="Enter your skills" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input accept="image/*" id="profileImage" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Input accept=".pdf" id="resume" type="file" />
          </div>
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your relevant work experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-1">Company</Label>
                    <Input id="company-1" placeholder="Enter company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position-1">Position</Label>
                    <Input id="position-1" placeholder="Enter position" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-1">From</Label>
                    <Input id="from-1" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-1">To</Label>
                    <Input id="to-1" type="date" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="institution-1">Institution</Label>
                    <Input id="institution-1" placeholder="Enter institution" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degree-1">Degree</Label>
                    <Input id="degree-1" placeholder="Enter degree" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from-1">From</Label>
                    <Input id="from-1" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to-1">To</Label>
                    <Input id="to-1" type="date" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>
                  Add your professional certifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="certification-1">Certification</Label>
                      <Input
                        id="certification-1"
                        placeholder="Enter certification"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authority-1">Authority</Label>
                      <Input id="authority-1" placeholder="Enter authority" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="from-1">From</Label>
                      <Input id="from-1" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="to-1">To</Label>
                      <Input id="to-1" type="date" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add your professional skills.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Checkbox id="communication" value="communication">
                    Communication
                  </Checkbox>
                  <Checkbox id="teamwork" value="teamwork">
                    Teamwork
                  </Checkbox>
                  <Checkbox id="attention" value="attention">
                    Attention to detail
                  </Checkbox>
                  <Checkbox id="problem-solving" value="problem-solving">
                    Problem solving
                  </Checkbox>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription>
                  Update your contact information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
