/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3jMGAlSczhY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { CardContent, CardFooter, Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function FacilityProfile() {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="space-y-4">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Your Profile Information
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter facility name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facilityType">Facility Type</Label>
            <Input id="facilityType" placeholder="Enter facility type" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="min-h-[100px]"
              id="description"
              placeholder="Enter facility description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="Enter facility address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input accept="image/*" id="profileImage" type="file" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Save</Button>
      </CardFooter>
    </Card>
  );
}
