import { LazyTooltip } from "@/components/lazy-tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, XIcon } from "lucide-react";
import type { getUserSkillIndicator } from "@/features/user/services/repo/getUserSkillIndicator";

type UserSkillDetail = Awaited<ReturnType<typeof getUserSkillIndicator>>

export function IndikatorDetail({ user }: { user: UserSkillDetail }) {

    if (!user) {
        return <div>Data tidak ditemukan</div>
    }

    return (
        <div key={user.namaUser} className="border rounded px-4 pb-4 shadow mb-20">
            <div className="mt-6">
                <h3 className="text-base font-semibold tracking-tight whitespace-nowrap px-4">{user.namaUser}</h3>
            </div>
            <Separator className="mt-4 mb-6" />
            <div className="flex flex-col gap-y-2">
                {user.skills.map((skill, i) => (
                    <div key={`${user.namaUser}-${skill.namaSkill}`} className="flex items-center border rounded px-4 py-2 shadow">
                        <div className="w-60">
                            <h2 className="text-sm font-light tracking-wide">{skill.namaSkill}</h2>
                        </div>
                        {/* <Separator orientation="vertical" /> */}
                        <div className="flex gap-x-8">
                            {skill.levels.map((levelItem, i) => (
                                <div key={`${user.namaUser}-${skill.namaSkill}-${levelItem.level}`} className="flex flex-col gap-y-1">
                                    <p className="text-xs">Level {levelItem.level}</p>
                                    <div className="flex gap-x-1.5">
                                        {levelItem.subskills.map((subskill, i) => (
                                            <LazyTooltip key={`${user.namaUser}-${skill.namaSkill}-${levelItem.level}-${subskill.namaSubskill}`} content={
                                                <div>
                                                    <p className="font-semibold mb-1">{subskill.namaSubskill}</p>
                                                    <p>
                                                        {subskill.isBaca ? (
                                                            <span className="flex items-center gap-x-1 text-green-500">
                                                                <CheckIcon className="size-4" /> Sudah Baca
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-x-1 text-red-500">
                                                                <XIcon className="size-4" /> Belum Baca
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p>
                                                        {subskill.isLulus ? (
                                                            <span className="flex items-center gap-x-1 text-green-500">
                                                                <CheckIcon className="size-4" /> Lulus Kuis
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-x-1 text-red-500">
                                                                <XIcon className="size-4" /> Belum Lulus Kuis
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            }>
                                                <div className={cn("size-4 rounded-xs bg-gray-300",
                                                    subskill.isBaca && subskill.isLulus && "bg-green-500",
                                                    subskill.isBaca && !subskill.isLulus && "bg-blue-500"
                                                )} />
                                            </LazyTooltip>

                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}