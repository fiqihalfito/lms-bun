import { NavLink } from "react-router";
import { CircleCheckIcon, TablePropertiesIcon, UserCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    title: "Statistik Lulus Skill",
    desc: "Melihat jumlah orang yang lulus berdasarkan kategori skill",
    href: "/dashboard/stat-lulus-skill",
    icon: TablePropertiesIcon,
    tag: "List",
    tagClass: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
    accentClass: "bg-teal-500",
    iconClass: "text-teal-600 dark:text-teal-400",
    footerLabel: "Daftar user lulus skill",
  },
  {
    title: "Statistik Individu",
    desc: "Melihat statistik performa dan progres setiap individu secara detail",
    href: "/dashboard/stat-individu",
    icon: UserCheckIcon,
    tag: "Individu",
    tagClass: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    accentClass: "bg-blue-500",
    iconClass: "text-blue-600 dark:text-blue-400",
    footerLabel: "Profil performa",
  },
];

export default function DashboardPublicRoute() {
  return (
    <div className="">
      <div className="mb-8">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-1">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Menu Utama
        </h1>
        {/* <p className="text-sm text-muted-foreground">
          Pilih modul yang ingin Anda akses
        </p> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {routes.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className="group block"
          >
            <div
              className={cn(
                "relative flex flex-col overflow-hidden rounded-xl border border-border bg-card",
                "transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-sm"
              )}
            >
              {/* Top accent bar */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                  item.accentClass
                )}
              />

              {/* Card body */}
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg",
                      "border border-border bg-muted transition-colors duration-200 group-hover:bg-muted/70"
                    )}
                  >
                    <item.icon className={cn("size-5", item.iconClass)} />
                  </div>
                  <svg
                    className="size-4 text-muted-foreground/40 opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center gap-2 border-t border-border bg-muted/40 px-6 py-3">
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                    item.tagClass
                  )}
                >
                  {item.tag}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.footerLabel}
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}