import { useFetcher, type Form } from "react-router"
import type { getUserDataByIdUser } from "../services/repo/getUserDataByIdUser"
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { userProfilSchema, userSchema } from "../schema/user-schema";
import { cn } from "@/lib/utils";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Select } from "@/components/select-custom";
import type { loader as loaderGetRoleAll } from "@/features/role/loaders/get-role-all";

type FormUserprop = {
    // mode: "insert" | "update",
    dv?: Awaited<ReturnType<typeof getUserDataByIdUser>>
} & React.ComponentProps<typeof Form>


export function FormUser({ dv, className, ...props }: FormUserprop) {

    const fetcher = useFetcher({ key: "form-user" });
    const fetcherSelectRole = useFetcher<typeof loaderGetRoleAll>({ key: "select-role" });

    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: userSchema });
        },
        constraint: getZodConstraint(userProfilSchema),

        defaultValue: {
            email: dv?.userAccount?.email,
            idRole: dv?.userAccount?.idRole,
            namaUser: dv?.namaUser,
        },
        onSubmit(event, { formData, submission, action, method }) {
            event.preventDefault();

            // if update append idDokumen, if insert skip
            if (dv?.idUser) {
                formData.append("idUser", dv.idUser);
            }

            fetcher.submit(formData, {
                method: method,
                action: action,
            })

        },

        // Validate the form on blur event triggered
        // shouldValidate: 'onBlur',
        // shouldRevalidate: 'onInput',
    });

    let submitting = fetcher.state !== "idle"
    // const userAccount = fields.userAccount.getFieldset();

    return (
        <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action={`/app/master/user/action/submit-user`}
            className={cn("flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto", className)}
            {...props}
        >
            <FieldSet>
                <FieldLegend className="text-center">
                    {dv?.idUser ? "Update User" : "Tambah User"}
                </FieldLegend>
                <FieldGroup>
                    <FieldError id={form.errorId}>{form.errors}</FieldError>
                    <Field>
                        <FieldLabel htmlFor={fields.namaUser.id}>Nama User</FieldLabel>
                        <Input
                            {...getInputProps(fields.namaUser, { type: "text" })}
                            placeholder="Nama User"
                        />
                        <FieldError id={fields.namaUser.errorId}>{fields.namaUser.errors}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={fields.email.id}>Email</FieldLabel>
                        <Input
                            {...getInputProps(fields.email, { type: "text" })}
                            placeholder="Email"
                        />
                        <FieldError id={fields.email.errorId}>{fields.email.errors}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={fields.newpassword.id}>Password Baru</FieldLabel>
                        <Input
                            {...getInputProps(fields.newpassword, { type: "text" })}
                            placeholder="Password Baru"
                        />
                        <FieldError id={fields.newpassword.errorId}>{fields.newpassword.errors}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={fields.idRole.id}>Role</FieldLabel>
                        <Select
                            id={fields.idRole.id}
                            name={fields.idRole.name}
                            defaultValue={fields.idRole.defaultValue}
                            placeholder="Pilih Role"
                            label="Role"
                            items={fetcherSelectRole.data?.roles.map((role) => ({
                                value: role.idRole,
                                name: role.namaRole,
                            })) ?? []}
                            fetcherState={fetcherSelectRole.state}
                            loadItems={() => fetcherSelectRole.load("/app/resources/role/get-role-all")}
                        />
                        {fetcherSelectRole.state === "loading" && (
                            <FieldDescription className="flex items-center gap-2">
                                <Spinner /> <span>Memuat Role...</span>
                            </FieldDescription>
                        )}
                        <FieldError id={fields.idRole.errorId}>{fields.idRole.errors}</FieldError>
                    </Field>
                </FieldGroup>

                <Field>
                    <Button type="submit" disabled={submitting}>
                        {submitting && <Spinner />}
                        {submitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </Field>
                {/* <FieldSeparator>Or continue with</FieldSeparator> */}

            </FieldSet>
        </fetcher.Form>
    )
}