import { createFileRoute } from "@tanstack/react-router"
import {
  CalendarIcon,
  CircleAlertIcon,
  CircleDotIcon,
  CornerDownRightIcon,
  FlagIcon,
  LoaderIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  PanelTopIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"

import { ISSUES, STATUS } from "@/docs/data"
import { DocsPage, Section } from "@/docs/page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const Route = createFileRoute("/blocks/issue-tracker")({ component: IssueTrackerPage })

function IssueTrackerPage() {
  return (
    <DocsPage
      eyebrow="Blocks"
      title="Issue tracker"
      description="The pieces together: a board where raised cards sit in recessed lanes, and a dense, keyboard-first list on a table."
    >
      <Section title="Board">
        <Board />
      </Section>
      <Section title="List">
        <IssueList />
      </Section>
    </DocsPage>
  )
}

function Chip({ icon: Icon, className, children }: { icon: typeof FlagIcon; className: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-4xl bg-muted px-2 text-xs font-medium">
      <Icon className={`size-3.5 ${className}`} />
      {children}
    </span>
  )
}

function Board() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { name: "To-do", icon: LoaderIcon, count: 1 },
        { name: "In review", icon: CircleDotIcon, count: 0 },
      ].map((col, i) => (
        <div key={col.name} className="flex flex-col gap-3 rounded-2xl border material-recessed p-3">
          <div className="flex items-center gap-2 px-1 pt-1">
            <col.icon className="size-4 text-muted-foreground" />
            <span className="font-medium">{col.name}</span>
            <span className="text-muted-foreground tabular-nums">{col.count}</span>
          </div>
          {i === 0 ? (
            <Card size="sm" interactive className="gap-3">
              <CardContent className="flex flex-wrap gap-1.5">
                <Chip icon={FlagIcon} className="text-destructive-subtle-foreground">
                  <span className="text-destructive-subtle-foreground">High</span>
                </Chip>
                <Chip icon={CircleAlertIcon} className="text-warning">
                  Pending
                </Chip>
                <Chip icon={PanelTopIcon} className="text-info">
                  Landing page
                </Chip>
              </CardContent>
              <CardContent className="grid gap-1">
                <div className="text-base font-medium">Homepage redesign feedback</div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CornerDownRightIcon className="size-3.5 shrink-0" />
                  <span className="truncate">Client requested UI refinement for hero section</span>
                </div>
              </CardContent>
              <CardFooter className="justify-between bg-transparent">
                <div className="flex -space-x-2">
                  {["FH", "AL", "S"].map((a) => (
                    <Avatar key={a} className="ring-2 ring-card">
                      <AvatarFallback>{a}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageCircleIcon className="size-3.5" /> 5
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="size-3.5" /> Tomorrow
                  </span>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid h-24 place-items-center rounded-xl border border-dashed text-xs text-muted-foreground">
              Drop issues here
            </div>
          )}
          <Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
            <PlusIcon /> Add task
          </Button>
        </div>
      ))}
    </div>
  )
}

function IssueList() {
  return (
    <Card className="gap-0 py-0">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-subtle-foreground" />
          <Input className="border-transparent bg-transparent pl-8 shadow-none dark:bg-transparent" placeholder="Filter issues…" />
        </div>
        <Kbd>F</Kbd>
        <Separator orientation="vertical" className="mx-1 h-5" />
        <Button size="sm">
          <PlusIcon /> New issue
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 pl-4">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden sm:table-cell">Priority</TableHead>
            <TableHead className="w-12" />
            <TableHead className="w-10 pr-4" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {ISSUES.map((issue) => {
            const s = STATUS[issue.status]
            return (
              <TableRow key={issue.id}>
                <TableCell className="pl-4 font-mono text-xs text-muted-foreground">{issue.id}</TableCell>
                <TableCell>
                  <div className="flex min-w-0 items-center gap-2">
                    <s.icon className={`size-4 shrink-0 ${s.className}`} aria-label={s.label} />
                    <span className="truncate">{issue.title}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={issue.priority === "Urgent" ? "destructive" : "outline"}>{issue.priority}</Badge>
                </TableCell>
                <TableCell>
                  <Avatar size="sm">
                    <AvatarFallback>{issue.assignee}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="pr-4">
                  <Button variant="ghost" size="icon-xs" aria-label="More">
                    <MoreHorizontalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span>5 of 128 issues</span>
        <span>
          <Kbd>J</Kbd> <Kbd>K</Kbd> to navigate
        </span>
      </CardFooter>
    </Card>
  )
}
