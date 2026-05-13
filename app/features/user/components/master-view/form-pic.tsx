import { useFetcher, type Form } from "react-router";
import { getFormProps, getInputProps, getSelectProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { userPicFormSchema } from "../../schema/user-pic-schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type UserDropdownItem = {
  idUser: string,
  namaUser: string
}

type UserDropdown = UserDropdownItem[]

type FormPicprop = {
  // mode: "insert" | "update",
  userDropdown: UserDropdown
} & React.ComponentProps<typeof Form>;


export function FormPic({ userDropdown, className, ...props }: FormPicprop) {
  const fetcher = useFetcher({ key: "form-pic" });

  const [form, fields] = useForm({
    // Sync the result of last submission from action fetcher
    lastResult: fetcher.state === "idle" ? fetcher.data : null,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: userPicFormSchema });
    },
    // constraint: getZodConstraint(userPicFormSchema),

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  let submitting = fetcher.state !== "idle";
  // const userAccount = fields.userAccount.getFieldset();

  return (
    <fetcher.Form
      {...getFormProps(form)}
      method="post"
      action={`/app/master/pic/action/submit-pic`}
      className={cn(
        "flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto",
        className,
      )}
      {...props}
    >
      <FieldSet>
        <FieldLegend className="text-center">
          Tambah PIC
        </FieldLegend>
        <FieldGroup>
          <FieldError id={form.errorId}>{form.errors}</FieldError>
          <Field>
            <FieldLabel htmlFor={fields.idUser.id}>
              Nama PIC
            </FieldLabel>
            <Select
              key={fields.idUser.key}
              name={fields.idUser.name}
              form={fields.idUser.formId}
              required={fields.idUser.required}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih user sebagai PIC" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {userDropdown.map((item) => (
                    <SelectItem key={item.idUser} value={item.idUser}>
                      {item.namaUser}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError id={fields.idUser.errorId}>
              {fields.idUser.errors}
            </FieldError>
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
  );
}
