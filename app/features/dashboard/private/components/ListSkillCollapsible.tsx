import { useState } from "react";
import {
    ChevronDownIcon,
    Users2Icon,
    Layers3Icon,
    PyramidIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import React from "react";

type ListSkillCollapsibleProp = {
    namaTeam: string | null;
    children: React.ReactNode;
    isOpen?: boolean;
};

export function ListSkillCollapsible({ namaTeam, children, isOpen }: ListSkillCollapsibleProp) {
    const [open, setOpen] = useState(isOpen ?? true);

    // Menghitung jumlah children untuk informasi tambahan
    const childrenCount = React.Children.count(children);

    return (
        <div className={cn(
            "group overflow-hidden rounded-xl border bg-card transition-all duration-300 shadow-sm",
            open ? "ring-1 ring-primary/20 shadow-md" : "hover:border-primary/30"
        )}>
            <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger asChild>
                    <div className={cn(
                        "flex cursor-pointer items-center justify-between p-4 sm:p-6 transition-colors",
                        open ? "bg-accent/30" : "hover:bg-accent/50"
                    )}>
                        <div className="flex items-center gap-4">
                            {/* Icon Decorator */}
                            <div className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-lg border transition-all duration-500",
                                open ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
                            )}>
                                <PyramidIcon className="h-6 w-6" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-lg font-bold tracking-tight">
                                    {namaTeam ?? "General Skills / Tanpa Team"}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="px-2 py-0 text-[10px] uppercase font-bold tracking-wider opacity-80">
                                        Team Group
                                    </Badge>
                                    <span className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
                                        <Layers3Icon className="w-3.5 h-3.5" />
                                        {childrenCount} Skills Available
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "rounded-full transition-transform duration-300",
                                open ? "rotate-180 bg-background shadow-sm" : ""
                            )}
                        >
                            <ChevronDownIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-all duration-300 ease-in-out data-[state=closed]:opacity-0 data-[state=open]:opacity-100 overflow-hidden">
                    <div className="px-4 pb-8 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
                        {children}
                    </div>
                </CollapsibleContent>
            </Collapsible>

        </div>
    );
}