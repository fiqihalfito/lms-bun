import { NavLink } from "react-router"

export function NavDashboard() {
    return (
        <div className="flex flex-col gap-y-1x">
            <h6 className="px-8 font-medium text-sm text-muted-foreground mb-4">Dashboard</h6>
            <ButtonNavDashboard label="Stat Lulus Skill" to="/dashboard/stat-lulus-skill" />
            <ButtonNavDashboard label="Stat Individu" to="/dashboard/stat-individu" />
            {/* <ButtonNavDashboard label="Indikator Individu" to="/dashboard/indikator-individu" /> */}
        </div>
    )
}

function ButtonNavDashboard({ label, to }: { label: string, to: string }) {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                `py-4 px-8 font-medium  border-y border-transparent transition-all hover:border-gray-200 cursor-pointer 
                ${isActive ? 'bg-gray-100 font-semibold' : ''}`
            }>
            {label}
        </NavLink>
    )
}