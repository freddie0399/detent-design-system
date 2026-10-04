import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ = [
  {
    q: "Can I move issues between projects?",
    a: "Yes. Open the issue's menu, choose Move to, and pick a project. History and comments move with it.",
  },
  {
    q: "What happens to archived projects?",
    a: "They're hidden from views and search but kept indefinitely. You can restore one at any time.",
  },
  {
    q: "Do guests count toward my seat limit?",
    a: "No. Guests can comment on issues they're invited to and don't use a paid seat.",
  },
]

export default function AccordionDemo() {
  return (
    <Accordion defaultValue={["0"]} className="w-full max-w-md">
      {FAQ.map((item, i) => (
        <AccordionItem key={item.q} value={String(i)}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
