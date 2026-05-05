import type { LayananService } from "../services/LayananService";

export type { loader as loaderLayanan } from "../loaders/get-layanan-all";

export type LayananType = Awaited<
  ReturnType<typeof LayananService.getLayananById>
>;
