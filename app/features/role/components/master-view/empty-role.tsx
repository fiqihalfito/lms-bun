import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { XIcon } from "lucide-react";

export function EmptyRole() {
  return (
    <Empty className="h-full bg-muted/50">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="border-2">
          <XIcon />
        </EmptyMedia>
        <EmptyTitle>Tidak Ada Role</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Tidak ada role yang terdaftar
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
