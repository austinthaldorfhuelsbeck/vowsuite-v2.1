import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

export function ProjectsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">All Projects</Button>
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
}
