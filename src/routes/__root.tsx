import { useState } from "react"
import { Link, Outlet, createRootRoute, useRouterState, type ErrorComponentProps } from "@tanstack/react-router"
import { SlidersHorizontalIcon } from "lucide-react"

import "@/explorer/fonts"
import { AppSidebar } from "@/docs/app-sidebar"
import { NAV } from "@/docs/nav"
import { DocsPage } from "@/docs/page"
import { BrandProvider, ThemeProvider, useBrandContext } from "@/docs/providers"
import { Explorer } from "@/explorer/Explorer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: RouteError,
})

function RootLayout() {
  return (
    <ThemeProvider>
      <BrandProvider>
        <TooltipProvider>
          <Toaster>
            <Shell />
          </Toaster>
        </TooltipProvider>
      </BrandProvider>
    </ThemeProvider>
  )
}

function Shell() {
  const [explorerOpen, setExplorerOpen] = useState(false)
  const { brand, setBrand } = useBrandContext()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur md:px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 h-4" />
          <Trail />
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Brand · <span className="text-foreground">{brand.name}</span>
            </span>
            <Button
              variant={explorerOpen ? "secondary" : "outline"}
              size="sm"
              onClick={() => setExplorerOpen((o) => !o)}
            >
              <SlidersHorizontalIcon /> Direction
            </Button>
          </div>
        </header>
        <Outlet />
      </SidebarInset>

      {explorerOpen && (
        <aside className="fixed inset-y-0 right-0 z-20 w-80 max-w-full border-l bg-sidebar shadow-lg lg:sticky lg:top-0 lg:h-svh lg:shrink-0 lg:shadow-none">
          <Explorer brand={brand} setBrand={setBrand} onClose={() => setExplorerOpen(false)} />
        </aside>
      )}
    </SidebarProvider>
  )
}

/** "Components / Button" from the nav manifest. */
function Trail() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  for (const section of NAV) {
    if (section.to === pathname) return <span className="font-medium">{section.title}</span>
    const item = section.items?.find((i) => i.to === pathname)
    if (item) {
      return (
        <span className="truncate">
          <span className="text-muted-foreground">{section.title} / </span>
          <span className="font-medium">{item.title}</span>
        </span>
      )
    }
  }
  return null
}

function RouteError({ error, reset }: ErrorComponentProps) {
  const err = error instanceof Error ? error : new Error(String(error))
  return (
    <DocsPage title="Something went wrong" description="This page hit an error while rendering.">
      <Alert variant="destructive">
        <AlertTitle>{err.name}</AlertTitle>
        <AlertDescription className="font-mono text-xs">{err.message}</AlertDescription>
      </Alert>
      <div>
        <Button onClick={reset}>Try again</Button>
      </div>
    </DocsPage>
  )
}

function NotFound() {
  return (
    <DocsPage title="Page not found" description="That page doesn't exist (yet).">
      <div>
        <Button render={<Link to="/" />}>Back to overview</Button>
      </div>
    </DocsPage>
  )
}
