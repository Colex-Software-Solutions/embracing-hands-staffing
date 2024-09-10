import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { X } from "lucide-react";
import axios from "axios";

interface Nurse {
  id: string;
  firstname: string;
  lastname: string;
}

interface BlockedNurse {
  id: string;
  staff: Nurse;
}

export default function BlockNurseModal({
  facilityId,
  facilityName,
}: {
  facilityId: string;
  facilityName: string;
}) {
  const [blockedNurses, setBlockedNurses] = useState<BlockedNurse[]>([]);
  const [allNurses, setAllNurses] = useState<Nurse[]>([]);
  const [selectedNurse, setSelectedNurse] = useState("");

  useEffect(() => {
    fetchBlockedNurses();
    fetchAllNurses();
  }, []);

  const fetchBlockedNurses = async () => {
    try {
      const response = await fetch(`/api/block-nurse/${facilityId}`);
      if (response.ok) {
        const data = await response.json();
        setBlockedNurses(data);
      }
    } catch (error) {
      console.error("Error fetching blocked nurses:", error);
    }
  };

  const fetchAllNurses = async () => {
    try {
      const response = await fetch("/api/staff");

      if (response.ok) {
        const data = await response.json();
        const nurses = data
          .filter((nurse: any) => nurse.staffProfile)
          .map((nurse: any) => nurse.staffProfile);
        setAllNurses(nurses);
      }
    } catch (error) {
      console.error("Error fetching all nurses:", error);
    }
  };

  const handleAddNurse = async () => {
    if (selectedNurse) {
      try {
        const response = await axios.post(`/api/block-nurse/${facilityId}`, {
          staffId: selectedNurse,
        });
        await fetchBlockedNurses();
        setSelectedNurse("");
      } catch (error) {
        console.error("Error blocking nurse:", error);
      }
    }
  };

  const handleRemoveNurse = async (nurseId: string) => {
    try {
      const response = await fetch(`/api/block-nurse/${facilityId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId: nurseId }),
      });

      if (response.ok) {
        await fetchBlockedNurses();
      }
    } catch (error) {
      console.error("Error unblocking nurse:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full h-auto min-h-[44px] border-0 justify-start items-start text-left p-2 font-normal hover:bg-green-600 hover:text-white whitespace-normal"
          variant="outline"
        >
          <span className="line-clamp-2">Block Nurses from {facilityName}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Block Nurses from {facilityName}</DialogTitle>
          <DialogDescription>
            Select nurses to block from viewing jobs at this facility.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={setSelectedNurse} value={selectedNurse}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a nurse" />
            </SelectTrigger>
            <SelectContent>
              {allNurses
                .filter(
                  (nurse) =>
                    !blockedNurses.some(
                      (blocked) => blocked.staff.id === nurse.id
                    )
                )
                .map((nurse) => (
                  <SelectItem key={nurse.id} value={nurse.id}>
                    {nurse.firstname} {nurse.lastname}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddNurse} disabled={!selectedNurse}>
            Add to Blocked List
          </Button>
          <div className="mt-4">
            <h4 className="mb-2 font-medium">Blocked Nurses:</h4>
            <ul className="space-y-2">
              {blockedNurses.map((blockedNurse) => (
                <li
                  key={blockedNurse.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  {blockedNurse.staff.firstname} {blockedNurse.staff.lastname}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveNurse(blockedNurse.staff.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">
                      Remove {blockedNurse.staff.firstname}{" "}
                      {blockedNurse.staff.lastname} from blocked list
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
