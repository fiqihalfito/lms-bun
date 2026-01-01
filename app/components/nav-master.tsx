// import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import { BuildingIcon, DatabaseZapIcon, LayoutDashboardIcon, PyramidIcon, ShieldIcon, ShieldUserIcon, UserIcon, UsersIcon, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink, useLocation, useMatch } from "react-router"

type RouteType = {
  title: string
  url: string
  icon?: LucideIcon
}[]

const route: RouteType = [
  {
    title: "User",
    url: "/app/master/user",
    icon: UserIcon,
  },
  {
    title: "Layanan",
    url: "/app/master/layanan",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Skill",
    url: "/app/master/skill",
    icon: PyramidIcon,
  },
  {
    title: "SubBidang",
    url: "/app/master/subbidang",
    icon: BuildingIcon,
  },
  {
    title: "Team",
    url: "/app/master/team",
    icon: ShieldIcon,
  },
  {
    title: "Anggota Team",
    url: "/app/master/anggota-team",
    icon: UsersIcon,
  },
  {
    title: "Role",
    url: "/app/master/role",
    icon: ShieldUserIcon,
  },
]

export function NavMaster() {


  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu Master</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {route.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild isActive={Boolean(useMatch(item.url))}>
                <NavLink to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
