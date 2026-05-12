import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getFormProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4"
import { useFetcher } from "react-router"
import z from "zod"
import { updatePicSubskillSchema } from "../schema/updatePicSubskillSchema"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useEffectEvent, useState } from "react"



type PicDropdownItem = {
    idUser: string,
    namaUser: string,
}

type PicDropdown = PicDropdownItem[]

type ModalGantiPicSubskillProp = {
    idSubSkill: string,
    picDropdown: PicDropdown
    defaultValue?: z.infer<typeof updatePicSubskillSchema>
}



export function ModalGantiPicSubskill({ idSubSkill, picDropdown, defaultValue }: ModalGantiPicSubskillProp) {

    const fetcher = useFetcher()
    let submitting = fetcher.state !== "idle";

    const [open, setOpen] = useState(false)
    const onFetcherDone = useEffectEvent(() => {
        if (fetcher.data?.success) {
            setOpen(false)
        }
    })

    useEffect(() => {
        if (fetcher.state === "idle") {
            onFetcherDone()
        }
    }, [fetcher.state])

    const [form, fields] = useForm({
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,
        // constraint: getZodConstraint(updatePicSubskillSchema),
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: updatePicSubskillSchema });
        },
        defaultValue: defaultValue
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline" type="button">Ubah PIC</Button>
            </DialogTrigger>

            <DialogContent key={idSubSkill} className="sm:max-w-sm"> {/* key disini supaya input value tidak cache */}
                <fetcher.Form
                    {...getFormProps(form)}
                    method="post"
                    action={`/app/master/skill/action/subskill/${idSubSkill}/update-pic-subskill`}
                    className="grid gap-6" // mengikuti parent DialogContent karena kena override
                >
                    <DialogHeader>
                        <DialogTitle>Ubah PIC Subskill</DialogTitle>
                        <DialogDescription>
                            Pastikan PIC yang terdaftar di menu PIC Subskill. Jika tidak ada, tambahkan user sebagai PIC terlebih dahulu
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <FieldError id={form.errorId}>{form.errors}</FieldError>
                        <Field>
                            <FieldLabel htmlFor={fields.idPic.id}>PIC Subskill terdaftar</FieldLabel>
                            <Select
                                key={fields.idPic.key}
                                name={fields.idPic.name}
                                form={fields.idPic.formId}
                                defaultValue={fields.idPic.initialValue}
                                required={fields.idPic.required}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih PIC Subskill" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {picDropdown.map((pic) => (
                                            <SelectItem key={pic.idUser} value={pic.idUser}>
                                                {pic.namaUser}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError id={fields.idPic.errorId}>
                                {fields.idPic.errors}
                            </FieldError>
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Spinner />}
                            {submitting ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </fetcher.Form>
            </DialogContent>
        </Dialog >
    )
}