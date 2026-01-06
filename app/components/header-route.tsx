import { Separator } from "./ui/separator";



interface HeaderRouteProps {
    title: string | React.ReactNode;
    description?: string;
    actionButton?: React.ReactNode;
}

export function HeaderRoute({ title, description, actionButton }: HeaderRouteProps) {
    return (
        <header className="flex flex-col gap-4 ">
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                {actionButton}
                {/* <Button size={"lg"} variant={"outline"} asChild className="shadow-xl rounded-full">
                    <Link to={"/dashboard"}>
                        <SquareArrowOutUpRightIcon />
                        Dashboard Subbidang
                    </Link>
                </Button> */}
            </div>
            <Separator className="mb-8" />
        </header>
    )
}