import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import data from "@/lib/data/skills.json";

const FeeSheet = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Fee Sheet</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill Tag</TableHead>
            <TableHead>Charge (per hour)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((skill) => (
            <TableRow key={skill.value}>
              <TableCell>{skill.label}</TableCell>
              <TableCell>${skill.charge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FeeSheet;
