import React, { useState } from "react";
import { Task } from "../../tasks/data/schema";
import { Button } from "../button";
import { labels, priorities, statuses } from "../../tasks/data/data";
import { useToast } from "../use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Label } from "../label";
import { Textarea } from "../textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../dropdown-menu";

export function EditTaskModal({
  task,
  handleTaskUpdate,
}: {
  task: Task;
  handleTaskUpdate: (updatedTask: Task) => void;
}) {
  const { toast } = useToast();
  const [currentTask, setCurrentTask] = useState<Task>(task);

  const handleChange = (field: keyof Task, value: string) => {
    console.log(field, value);
    setCurrentTask({ ...currentTask, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTaskUpdate(currentTask);
    toast({
      variant: "default",
      title: "Success!",
      description: "Task has been Edited Successfully.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full border-0 justify-start flex pl-2 font-normal"
          variant="outline"
        >
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to the task here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Textarea
                name="title"
                className="col-span-3 h-36"
                value={currentTask.title}
                onChange={(e) => {
                  handleChange("title", e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <DropdownMenu>
                <Label>Status</Label>
                <DropdownMenuTrigger
                  asChild
                  className=" col-start-2 col-span-3"
                >
                  <Button variant="outline">
                    {currentTask.status || "Select Status"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={currentTask.status}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    {statuses.map((status) => (
                      <DropdownMenuRadioItem
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <DropdownMenu>
                <Label>Label</Label>
                <DropdownMenuTrigger
                  asChild
                  className=" col-start-2 col-span-3"
                >
                  <Button variant="outline">
                    {currentTask.label || "Select label"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={currentTask.label}
                    onValueChange={(value) => handleChange("label", value)}
                  >
                    {labels.map((label) => (
                      <DropdownMenuRadioItem
                        key={label.value}
                        value={label.value}
                      >
                        {label.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <DropdownMenu>
                <Label>Priority</Label>
                <DropdownMenuTrigger
                  asChild
                  className=" col-start-2 col-span-3"
                >
                  <Button variant="outline">
                    {currentTask.priority || "Select Priority"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={currentTask.priority}
                    onValueChange={(value) => handleChange("priority", value)}
                  >
                    {priorities.map((priority) => (
                      <DropdownMenuRadioItem
                        key={priority.value}
                        value={priority.value}
                      >
                        {priority.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
