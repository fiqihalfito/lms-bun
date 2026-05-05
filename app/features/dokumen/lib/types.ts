import type { DokumenService } from "../services/DokumenService";

export type DokumenByTipe = Awaited<
  ReturnType<typeof DokumenService.getDokumenByTipe>
>;

export type DefaultValueFormIKSOPProps = Awaited<
  ReturnType<typeof DokumenService.getDokumenById>
>[number];
