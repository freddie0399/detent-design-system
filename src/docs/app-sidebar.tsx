import { useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { ChevronRightIcon, MoonIcon, SunIcon } from "lucide-react"

import { NAV } from "./nav"
import { useTheme } from "./providers"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { theme, toggle } = useTheme()
  const { isMobile, setOpenMobile } = useSidebar()
  // The mobile sidebar is a sheet: close it once a page is chosen.
  const onNavigate = () => isMobile && setOpenMobile(false)
  // Groups open when you navigate into them and never close on their own;
  // manual toggles stick until you next navigate into that section.
  const activeSection = NAV.find((s) => s.items?.some((i) => i.to === pathname))?.title
  const [open, setOpen] = useState<Record<string, boolean>>({ Components: true })
  const [lastActive, setLastActive] = useState<string>()
  if (activeSection !== lastActive) {
    setLastActive(activeSection)
    if (activeSection) setOpen((o) => ({ ...o, [activeSection]: true }))
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" onClick={onNavigate} className="flex h-8 items-center gap-2 px-2">
          <div className="grid size-5 place-items-center rounded-sm bg-primary text-2xs font-semibold text-primary-foreground">
            D
          </div>
          <span className="font-medium">Detent</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV.map((section) => {
              if (!section.items) {
                return (
                  <SidebarMenuItem key={section.title}>
                    <SidebarMenuButton
                      render={<Link to={section.to} onClick={onNavigate} />}
                      isActive={pathname === section.to}
                    >
                      <section.icon />
                      <span>{section.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }
              return (
                <Collapsible
                  key={section.title}
                  open={open[section.title] ?? false}
                  onOpenChange={(isOpen) => setOpen((o) => ({ ...o, [section.title]: isOpen }))}
                  render={<SidebarMenuItem />}
                >
                  <CollapsibleTrigger render={<SidebarMenuButton />}>
                    <section.icon />
                    <span>{section.title}</span>
                    <span className="ml-auto text-xs text-sidebar-foreground/50 tabular-nums">
                      {section.items.length}
                    </span>
                    <ChevronRightIcon className="text-sidebar-foreground/50 transition-transform duration-200 group-data-[panel-open]/menu-button:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                    <SidebarMenuSub>
                      {section.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            render={<Link to={item.to} onClick={onNavigate} />}
                            isActive={pathname === item.to}
                          >
                            <span>{item.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex-row items-center justify-between px-4 text-xs text-muted-foreground">
        <span>v0.1.0</span>
        <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
