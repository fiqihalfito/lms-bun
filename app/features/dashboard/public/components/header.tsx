import { NavLink } from "react-router";

export function HeaderDashboardPublic() {
    return (
        <header className="bg-white border-b border-gray-200 ">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-between gap-1">
                    <NavLink to="/dashboard" className="cursor-pointer">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight hover:scale-98 transition-all duration-100">
                            LMS <span className="text-gray-300 font-light mx-1">|</span> Learning Management System
                        </h1>
                    </NavLink>
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        Digitalisasi PLN 2
                    </p>
                </div>
            </div>
        </header>
    )
}