import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Share</PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Share this view</PopoverTitle>
          <PopoverDescription>Anyone in the workspace with the link can open it.</PopoverDescription>
        </PopoverHeader>
        <div className="flex items-end gap-2">
          <div className="grid flex-1 gap-1.5">
            <Label htmlFor="share-link" className="sr-only">Link</Label>
            <Input id="share-link" readOnly defaultValue="https://acme.app/v/q3-roadmap" />
          </div>
          <Button size="sm">Copy</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
