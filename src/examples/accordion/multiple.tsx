import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AccordionMultiple() {
  return (
    <Accordion multiple defaultValue={["notifications", "privacy"]} className="w-full max-w-md">
      <AccordionItem value="notifications">
        <AccordionTrigger>Notifications</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">Email, push and in-app preferences.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="privacy">
        <AccordionTrigger>Privacy</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">Who can see your profile and activity.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="danger">
        <AccordionTrigger>Danger zone</AccordionTrigger>
        <AccordionContent className="text-muted-foreground">Transfer ownership or delete the workspace.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
