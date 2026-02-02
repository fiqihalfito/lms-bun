import type { Route } from "./+types/knowledge-skill";
import { HeaderRoute } from "@/components/header-route";
// import { Link } from "react-router"; // Uncomment jika ingin link aktif
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { BreadCrumb } from "@/components/breadcrumb";
import { getTeamById } from "@/features/team/services/getTeamById";
import { getSkillAndStats } from "@/features/skill/services/getSkillAndStats";
import { userContext } from "@/lib/context";

// --- Imports Icons Generic (Abstrak) ---
import {
    Layers,
    Command,
    Box,
    Cpu,
    Hash,
    Bookmark,
    Tag,
    Zap,
    Grid,
} from "lucide-react";
import { SkillCard } from "@/features/skill/components/skill-card";

// --- Helper Functions ---

// 1. Generate Style (Icon & Color) secara deterministik berdasarkan string nama
const getSkillVisual = (name: string) => {
    // Pool Icon Abstrak (Teknis tapi general)
    const icons = [Layers, Command, Box, Cpu, Hash, Bookmark, Tag, Zap, Grid];

    // Pool Warna Background (Soft/Elegant)
    const bgColors = [
        "bg-blue-50 text-blue-600 border-blue-200",
        "bg-violet-50 text-violet-600 border-violet-200",
        "bg-emerald-50 text-emerald-600 border-emerald-200",
        "bg-amber-50 text-amber-600 border-amber-200",
        "bg-rose-50 text-rose-600 border-rose-200",
        "bg-indigo-50 text-indigo-600 border-indigo-200",
        "bg-cyan-50 text-cyan-600 border-cyan-200",
        "bg-slate-50 text-slate-600 border-slate-200",
    ];

    // Simple hashing algorithm untuk mengubah string menjadi angka
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Pastikan hash positif
    const positiveHash = Math.abs(hash);

    // Pilih icon dan warna berdasarkan hash (konsisten untuk nama yang sama)
    const SelectedIcon = icons[positiveHash % icons.length];
    const selectedColor = bgColors[positiveHash % bgColors.length];

    return { Icon: SelectedIcon, colorClass: selectedColor };
};



// --- Loader ---
export async function loader({ request, params, context }: Route.LoaderArgs) {
    const user = context.get(userContext)
    const skills = await getSkillAndStats(user.idUser, params.idTeam)
    const team = await getTeamById(params.idTeam)

    return { skills, team }
}

// --- Component Utama ---
export default function KnowledgeSkillRoute({ loaderData, params }: Route.ComponentProps) {
    const { skills, team } = loaderData
    const skillList = skills

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
    ])

    return (
        <div className="space-y-6">
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Skill" description={`Daftar skill ${team[0]?.namaTeam || 'Team'}`} />

            {/* ======= UI IMPLEMENTATION START ========= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                {skillList.map((skill) => (
                    <SkillCard key={skill.idSkill} skill={skill} idTeam={params.idTeam} />
                ))}
            </div>
            {/* ======= UI IMPLEMENTATION END ========= */}
        </div>
    )
}