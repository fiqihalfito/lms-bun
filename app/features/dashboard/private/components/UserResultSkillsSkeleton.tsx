import { TableWrapper } from "@/components/table-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ROWS = 4;

export function UserResultSkillsSkeleton() {
    return (
        <div className=" border shadow-lg p-8 rounded-lg">

            {/* Page title */}
            <Skeleton className="h-5 w-44 mb-7" />

            {/* Single card with one table */}


            <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Skeleton className="h-3.5 w-10" /></TableHead>
                            <TableHead><Skeleton className="h-3.5 w-24" /></TableHead>
                            <TableHead className="text-center"><Skeleton className="h-3.5 w-20 mx-auto" /></TableHead>
                            <TableHead className="text-center"><Skeleton className="h-3.5 w-20 mx-auto" /></TableHead>
                            {/* <TableHead><Skeleton className="h-3.5 w-16" /></TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: ROWS }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-3.5 w-14" /></TableCell>
                                <TableCell><Skeleton className="h-3.5 w-5" /></TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center bg-muted rounded-lg h-9">
                                        <Skeleton className="h-3.5 w-7" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center bg-muted rounded-lg h-9">
                                        <Skeleton className="h-3.5 w-7" />
                                    </div>
                                </TableCell>
                                {/* <TableCell><Skeleton className="h-3.5 w-20" /></TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        </div>
    );
}