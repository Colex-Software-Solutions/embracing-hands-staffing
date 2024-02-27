import React from "react";
import { Skeleton } from "@/app/components/ui/skeleton";

const StaffProfileInfoSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-3 m-12">
      <div className="space-y-6 lg:col-span-2">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <div className="flex items-center space-x-2">
          <Skeleton className="w-36 h-36 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-32 mt-6" />
        <Skeleton className="h-20 mt-6" />
      </div>
      <div className="space-y-6 border-t pt-6 grid gap-4">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-12" />
      </div>
    </div>
  );
};

export default StaffProfileInfoSkeleton;
