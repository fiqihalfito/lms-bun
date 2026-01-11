import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router";
import { Button } from "./ui/button";
import React from "react";

export type BreadCrumbItem = {
    label: string;
    to: string;
}

type BreadCrumbProps = {
    routeBreadCrumb: BreadCrumbItem[],
}

export function BreadCrumb({ routeBreadCrumb }: BreadCrumbProps) {
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                {routeBreadCrumb.map((item, index) => {
                    const isLast = index === routeBreadCrumb.length - 1;
                    return (
                        <React.Fragment key={index}>
                            {isLast ? (
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink asChild>
                                            <Link className="hover:underline" to={item.to}>{item.label}</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}