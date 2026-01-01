import type { LucideIcon } from "lucide-react"
import { NavLink, type NavLinkProps } from "react-router"

type ItemDokumenLinkLobbyProps = {
    title: string
    description: string
    icon: LucideIcon
    to: string
    className?: string
}

export function ItemDokumenLinkLobby({
    title,
    description,
    icon: Icon,
    to,
    className,
}: ItemDokumenLinkLobbyProps) {
    return (
        <NavLink
            to={to}
            viewTransition
        >
            <div className="group flex flex-col items-center justify-center rounded-xl border-2 p-10 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:shadow-xl">
                <Icon className="size-16 transition-all duration-300 group-hover:scale-110 group-hover:text-primary-foreground" />
                <span className="mt-8 text-2xl font-bold transition-colors duration-300 group-hover:text-primary-foreground">
                    {title}
                </span>
                <span className="mt-2 text-center text-muted-foreground transition-colors duration-300 group-hover:text-primary-foreground/80">
                    {description}
                </span>
            </div>
        </NavLink>
    )
}