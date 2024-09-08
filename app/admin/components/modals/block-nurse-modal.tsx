import { useState } from "react";
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

// Mock data for nurses and blocked nurses
const allNurses = [
  { id: "1", name: "Jane Doe" },
  { id: "2", name: "John Smith" },
  { id: "3", name: "Emily Johnson" },
  { id: "4", name: "Michael Brown" },
];

export default function BlockNurseModal({
  facilityName,
}: {
  facilityName: string;
}) {
  const [blockedNurses, setBlockedNurses] = useState([
    { id: "5", name: "Sarah Wilson" },
  ]);
  const [selectedNurse, setSelectedNurse] = useState("");

  const handleAddNurse = () => {
    if (selectedNurse) {
      const nurseToAdd = allNurses.find((nurse) => nurse.id === selectedNurse);
      if (
        nurseToAdd &&
        !blockedNurses.some((nurse) => nurse.id === selectedNurse)
      ) {
        setBlockedNurses([...blockedNurses, nurseToAdd]);
        setSelectedNurse("");
      }
    }
  };

  const handleRemoveNurse = (nurseId: string) => {
    setBlockedNurses(blockedNurses.filter((nurse) => nurse.id !== nurseId));
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
                    !blockedNurses.some((blocked) => blocked.id === nurse.id)
                )
                .map((nurse) => (
                  <SelectItem key={nurse.id} value={nurse.id}>
                    {nurse.name}
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
              {blockedNurses.map((nurse) => (
                <li
                  key={nurse.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded"
                >
                  {nurse.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveNurse(nurse.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">
                      Remove {nurse.name} from blocked list
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
