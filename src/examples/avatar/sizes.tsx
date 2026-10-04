import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AvatarSizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm"><AvatarFallback>FH</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>FH</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>FH</AvatarFallback></Avatar>
    </div>
  )
}
