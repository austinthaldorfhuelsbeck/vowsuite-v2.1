"use client";

import { FileStackIcon } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type ProjectWithData } from "~/types";

export default function StageSelector(props: { project: ProjectWithData }) {
  const { project } = props;
  return (
    <Card className="rounded-sm">
      <CardContent className="flex flex-row items-center gap-3 p-3">
        <FileStackIcon size={36} />
        <Label htmlFor="stage" className="text-md">
          Stage
        </Label>
        <Select defaultValue={project.stage}>
          <SelectTrigger id="stage">
            <SelectValue placeholder="Select a stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LEAD">Lead</SelectItem>
            <SelectItem value="PROSPECT">Prospect</SelectItem>
            <SelectItem value="CLIENT">Client</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ONGOING">Ongoing</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
