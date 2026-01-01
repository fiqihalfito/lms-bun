import React from "react"
import { useControl } from "@conform-to/react/future"
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "./ui/select"

export type SelectItemType = {
    name: string | null
    value: string
}

export type SelectProps = {
    id?: string
    name: string
    items?: SelectItemType[]
    placeholder: string
    label?: string
    defaultValue?: string
    fetcherState?: "idle" | "loading" | "submitting"
    loadItems?: () => void
    ['aria-describedby']?: string
}

export function Select({
    name,
    items = [],
    placeholder,
    label,
    defaultValue,
    fetcherState,
    loadItems,
    ...props
}: SelectProps) {
    const selectRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null)

    const control = useControl({
        defaultValue,
        onFocus() {
            selectRef.current?.focus()
        },
    })

    // untuk edit biar muncul default values
    React.useEffect(() => {
        if (defaultValue !== undefined && items.length === 0) {
            loadItems?.()
        }
    }, [defaultValue, items.length])

    React.useEffect(() => {
        if (
            defaultValue !== undefined &&
            items.length > 0 &&
            control.value !== defaultValue
        ) {
            control.change(defaultValue)
        }
    }, [defaultValue, items.length])

    return (
        <>
            {/* Hidden input for Conform */}
            <input name={name} ref={control.register} hidden />

            <ShadcnSelect
                value={control.value}
                onValueChange={(value) => control.change(value)}
                onOpenChange={(open) => {
                    // if (open) {
                    //     loadItems?.()
                    // } else {
                    //     control.blur()
                    // }

                    if (open && fetcherState === "idle" && items.length === 0) {
                        loadItems?.()
                    } else {
                        control.blur()
                    }

                }}
            >
                <SelectTrigger {...props} ref={selectRef}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        {label && <SelectLabel>{label}</SelectLabel>}
                        {fetcherState === "idle" && items.length > 0 &&
                            items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.name}
                                </SelectItem>
                            ))}

                        {fetcherState === "idle" && items.length === 0 && (
                            <div className="px-2 py-1 text-sm text-muted-foreground">
                                No data
                            </div>
                        )}
                    </SelectGroup>


                </SelectContent>
            </ShadcnSelect>

        </>
    )
}
