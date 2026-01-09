import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

// import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { MasterPageNavButton } from "@/components/MasterPageNavButton"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavPICSubSkills } from "./nav-PIC-SKILL"
import { Link, matchPath, useLocation, useMatch, useRouteLoaderData } from "react-router"
import { DatabaseZap, FilesIcon, GaugeIcon, PyramidIcon } from "lucide-react"
import { NavMaster } from "./nav-master"
import { MainPageNavButton } from "./MainPageNavButton"
import type { UserContextForAuthType } from "@/lib/context"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: GaugeIcon,
    },
    {
      title: "Dokumen",
      url: "/app/dokumen",
      icon: FilesIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navMaster: [
    {
      title: "Data Master",
      url: "/app/master",
      icon: DatabaseZap,
    },
  ],
  picSubSkills: [
    {
      name: "PIC SubSkill",
      url: "/app/pic-subskill",
      icon: PyramidIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const location = useLocation()
  const isMaster = location.pathname.includes("/app/master")

  const { userData } = useRouteLoaderData("app") as { userData: UserContextForAuthType }


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Digitalisasi PLN 2</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isMaster ? (
          <>
            <NavMaster />
            <MainPageNavButton className="mt-auto" />
          </>
        ) : (
          <>
            <NavMain items={data.navMain} />
            <NavPICSubSkills items={data.picSubSkills} />
            {userData.idRole === "pegawai" && <MasterPageNavButton className="mt-auto" />}
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
