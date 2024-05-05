import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

const SummaryStatsCard = ({ title, value }: { title: string; value: any }) => {
  return (
    <Card className="mt-4">
      <CardHeader className="text-lg font-semibold">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-xl">{value}</CardContent>
    </Card>
  );
};

export default SummaryStatsCard;
