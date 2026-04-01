import { Link } from "react-router"

type TeamCardProps = {
    namaTeam?: string | null
    idTeam: string
}

export function TeamCard({ namaTeam, idTeam }: TeamCardProps) {
    return (
        <Link to={`/app/master/skill/team/${idTeam}`}>
            <div className="border rounded-md px-12 py-12 shadow bg-primary text-primary-foreground hover:bg-primary/80 hover:scale-101 transition-all">
                <h1 className="text-2xl font-bold tracking-normal">{namaTeam}</h1>
            </div>
        </Link>
    )
}