import { BoxesIcon, InboxIcon, SettingsIcon } from "lucide-react"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export default function SidebarDemo() {
  return (
    <div className="w-60 rounded-xl border bg-sidebar p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <InboxIcon />
            <span>Inbox</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton isActive>
            <BoxesIcon />
            <span>Components</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton variant="outline">
            <SettingsIcon />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
