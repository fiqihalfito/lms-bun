// test-run.ts

import { DashboardAdminService } from "./DashboardAdminService";

const result = await DashboardAdminService.getPicUploadStatus();
console.log(result);