import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const PRODUCT = [
  { title: "Issues", description: "Track bugs and features through cycles." },
  { title: "Projects", description: "Group issues toward a shared goal." },
  { title: "Insights", description: "Charts for throughput and cycle time." },
  { title: "Integrations", description: "GitHub, Slack, Figma and more." },
]

const RESOURCES = ["Documentation", "Changelog", "Community", "Status"]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[28rem] grid-cols-2 gap-1">
              {PRODUCT.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#" className="flex-col items-start gap-0.5">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-muted-foreground">{item.description}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1">
              {RESOURCES.map((item) => (
                <li key={item}>
                  <NavigationMenuLink href="#">{item}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
