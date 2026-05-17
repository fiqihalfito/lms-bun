import { FieldGroup } from "@/components/ui/field"
import { Form, useFetcher, useNavigate } from "react-router"
import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { SkillService } from "@/features/skill/services/SkillService"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { SearchIcon, XIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface FilterStatIndividuProps {
    skillDropdown: Awaited<ReturnType<typeof SkillService.getSkillDropdown>>
}

export function FilterStatIndividu({ skillDropdown }: FilterStatIndividuProps) {

    const fetcher = useFetcher()

    // for reset filter
    const navigate = useNavigate();

    const [formKey, setFormKey] = useState(0);
    const handleReset = () => {
        navigate(".", { replace: true }); // clears all query params
        setFormKey((prev) => prev + 1);
    };

    return (
        <div className="mb-6">
            <Form
                method="get"
                key={formKey}
            >
                <FieldGroup className="flex flex-col md:flex-row md:items-end gap-2">
                    <Field className="w-full max-w-xs">
                        <FieldLabel>Skill</FieldLabel>
                        <Select name="skill">
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih skill" />
                            </SelectTrigger>
                            <SelectContent>
                                {skillDropdown.reverse().map((team, i) => (
                                    <React.Fragment key={team.idTeam}>
                                        <SelectGroup>
                                            <SelectLabel>{team.namaTeam}</SelectLabel>
                                            {team.skill.map((skill) => (
                                                <SelectItem key={skill.idSkill} value={skill.namaSkill}>
                                                    {skill.namaSkill}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                        {i !== skillDropdown.length - 1 && <SelectSeparator />}
                                    </React.Fragment>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field className="w-52">
                        <Button type="submit" className="">
                            <SearchIcon />
                            Filter
                        </Button>
                    </Field>
                    <Field orientation={"horizontal"}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    size={"icon"}
                                    variant={"destructive"}
                                    className="cursor-pointer"
                                    onClick={handleReset}
                                >
                                    <XIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Reset Filter</p>
                            </TooltipContent>
                        </Tooltip>

                    </Field>
                </FieldGroup>
            </Form>
        </div>
    )
}