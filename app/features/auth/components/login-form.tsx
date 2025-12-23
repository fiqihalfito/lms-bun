import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Form, useFetcher } from "react-router"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4"
import { loginSchema } from "@/features/auth/schema/login-schema"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<typeof Form>) {

    const fetcher = useFetcher({ key: "login" });

    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: loginSchema });
        },
        constraint: getZodConstraint(loginSchema),

        // Validate the form on blur event triggered
        // shouldValidate: 'onBlur',
        // shouldRevalidate: 'onInput',
    });

    return (
        <fetcher.Form
            method="post"
            action="../action/login"
            relative="path"
            // id={form.id}
            // onSubmit={form.onSubmit}
            // noValidate
            {...getFormProps(form)}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Masukkan email korporat untuk login
                    </p>
                </div>
                <FieldError id={form.errorId}>{form.errors}</FieldError>
                <Field>
                    <FieldLabel htmlFor={fields.email.id}>Email</FieldLabel>
                    <Input
                        // id="email"
                        // type="email"
                        // required
                        {...getInputProps(fields.email, { type: "email" })}
                        placeholder="email@iconpln.co.id"
                    />
                    <FieldError id={fields.email.errorId}>{fields.email.errors}</FieldError>
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor={fields.password.id}>Password</FieldLabel>
                    </div>
                    <Input
                        {...getInputProps(fields.password, { type: "password" })}
                        placeholder="Password"
                    />
                    <FieldError id={fields.password.errorId}>{fields.password.errors}</FieldError>
                </Field>
                <Field>
                    <Button type="submit">Login</Button>
                </Field>
                {/* <FieldSeparator>Or continue with</FieldSeparator> */}

            </FieldGroup>
        </fetcher.Form>
    )
}
