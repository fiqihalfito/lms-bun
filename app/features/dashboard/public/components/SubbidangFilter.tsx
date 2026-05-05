import { Button } from "@/components/ui/button";
import type { SubbidangService } from "@/features/subbidang/services/SubbidangService";
import { useQueryState } from "nuqs";

interface SubbidangFilterProps {
  subbidang: Awaited<ReturnType<typeof SubbidangService.getAllSubbidang>>;
}

export function SubbidangFilter({ subbidang }: SubbidangFilterProps) {
  const [subbidangQuery, setSubbidangQuery] = useQueryState("qSubBidang", {
    shallow: false,
  });

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {subbidang.map((item) => (
        <Button
          key={item.idSubBidang}
          variant={subbidangQuery === item.idSubBidang ? "default" : "outline"}
          onClick={() => setSubbidangQuery(item.idSubBidang)}
        >
          {item.namaSubBidang}
        </Button>
      ))}
    </div>
  );
}
