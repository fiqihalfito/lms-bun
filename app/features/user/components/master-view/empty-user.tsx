import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { XIcon } from "lucide-react";

export function EmptyUser() {
  return (
    <Empty className="h-full bg-muted/50">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="border-2">
          <XIcon />
        </EmptyMedia>
        <EmptyTitle>Tidak Ada User</EmptyTitle>
        <EmptyDescription className="max-w-xs text-pretty">
          Tidak ada user yang terdaftar
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
