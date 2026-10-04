import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All issues</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="backlog">Backlog</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="text-muted-foreground">128 issues across 4 teams.</TabsContent>
      <TabsContent value="active" className="text-muted-foreground">23 issues in progress.</TabsContent>
      <TabsContent value="backlog" className="text-muted-foreground">61 issues waiting for triage.</TabsContent>
    </Tabs>
  )
}
