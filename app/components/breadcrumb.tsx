import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router";

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
                        <BreadcrumbItem key={index}>
                            {isLast ? (
                                <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            ) : (
                                <>
                                    <BreadcrumbLink asChild>
                                        <Link to={item.to}>{item.label}</Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            )}
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}