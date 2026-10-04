import type { LinkProps } from "@tanstack/react-router"
import { BookOpenIcon, BoxesIcon, LayoutTemplateIcon, SwatchBookIcon, type LucideIcon } from "lucide-react"

/**
 * Docs navigation. `to` is typed against the generated route tree, so a link
 * to a page that doesn't exist fails the typecheck. Adding a page = one route
 * file in src/routes + one entry here.
 */
export interface NavItem {
  title: string
  to: LinkProps["to"]
}

export interface NavSection {
  title: string
  icon: LucideIcon
  /** A single page, or a collapsible parent with child pages. */
  to?: LinkProps["to"]
  items?: NavItem[]
}

export const NAV: NavSection[] = [
  { title: "Overview", icon: BookOpenIcon, to: "/" },
  {
    title: "Foundations",
    icon: SwatchBookIcon,
    items: [
      { title: "Colour", to: "/foundations/colour" },
      { title: "Typography", to: "/foundations/typography" },
      { title: "Shape & density", to: "/foundations/shape" },
      { title: "Materials", to: "/foundations/materials" },
      { title: "Motion", to: "/foundations/motion" },
    ],
  },
  {
    title: "Components",
    icon: BoxesIcon,
    items: [
      { title: "Accordion", to: "/components/accordion" },
      { title: "Alert", to: "/components/alert" },
      { title: "Alert dialog", to: "/components/alert-dialog" },
      { title: "Avatar", to: "/components/avatar" },
      { title: "Badge", to: "/components/badge" },
      { title: "Breadcrumb", to: "/components/breadcrumb" },
      { title: "Button", to: "/components/button" },
      { title: "Calendar", to: "/components/calendar" },
      { title: "Card", to: "/components/card" },
      { title: "Chart", to: "/components/chart" },
      { title: "Checkbox", to: "/components/checkbox" },
      { title: "Collapsible", to: "/components/collapsible" },
      { title: "Combobox", to: "/components/combobox" },
      { title: "Command", to: "/components/command" },
      { title: "Context menu", to: "/components/context-menu" },
      { title: "Data table", to: "/components/data-table" },
      { title: "Date picker", to: "/components/date-picker" },
      { title: "Dialog", to: "/components/dialog" },
      { title: "Dropdown menu", to: "/components/dropdown-menu" },
      { title: "Field", to: "/components/field" },
      { title: "Hover card", to: "/components/hover-card" },
      { title: "Input", to: "/components/input" },
      { title: "Input group", to: "/components/input-group" },
      { title: "Input OTP", to: "/components/input-otp" },
      { title: "Kbd", to: "/components/kbd" },
      { title: "Label", to: "/components/label" },
      { title: "Navigation menu", to: "/components/navigation-menu" },
      { title: "Pagination", to: "/components/pagination" },
      { title: "Popover", to: "/components/popover" },
      { title: "Progress", to: "/components/progress" },
      { title: "Radio group", to: "/components/radio-group" },
      { title: "Select", to: "/components/select" },
      { title: "Separator", to: "/components/separator" },
      { title: "Sheet", to: "/components/sheet" },
      { title: "Sidebar", to: "/components/sidebar" },
      { title: "Skeleton", to: "/components/skeleton" },
      { title: "Slider", to: "/components/slider" },
      { title: "Spinner", to: "/components/spinner" },
      { title: "Switch", to: "/components/switch" },
      { title: "Table", to: "/components/table" },
      { title: "Tabs", to: "/components/tabs" },
      { title: "Textarea", to: "/components/textarea" },
      { title: "Toast", to: "/components/toast" },
      { title: "Toggle", to: "/components/toggle" },
      { title: "Toggle group", to: "/components/toggle-group" },
      { title: "Tooltip", to: "/components/tooltip" },
    ],
  },
  {
    title: "Blocks",
    icon: LayoutTemplateIcon,
    items: [{ title: "Issue tracker", to: "/blocks/issue-tracker" }],
  },
]
