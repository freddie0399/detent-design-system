import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Edit issue</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit issue</SheetTitle>
          <SheetDescription>Changes are saved when you press Save.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-1.5 px-4">
          <Label htmlFor="issue-title">Title</Label>
          <Input id="issue-title" defaultValue="Homepage redesign feedback" />
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>Save</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
