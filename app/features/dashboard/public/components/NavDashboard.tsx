import { NavLink } from "react-router"

export function NavDashboard() {
    return (
        <div className="flex flex-col gap-y-2.5 text-center ">
            <ButtonNavDashboard label="Stat Lulus Skill" to="/dashboard/stat-lulus-skill" />
            <ButtonNavDashboard label="Stat Individu" to="/dashboard/stat-individu" />
            <ButtonNavDashboard label="Indikator Individu" to="/dashboard/indikator-individu" />
        </div>
    )
}

function ButtonNavDashboard({ label, to }: { label: string, to: string }) {
    return (
        <NavLink to={to}
            className={({ isActive }) =>
                `py-2 font-medium  rounded-md border border-transparent transition-all hover:border-gray-200 cursor-pointer 
                ${isActive ? 'bg-gray-100' : ''}`
            }>
            {label}
        </NavLink>
    )
}