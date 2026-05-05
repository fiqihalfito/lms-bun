import { db } from "database/connect.server";
import { mSubBidang } from "database/schema";

export abstract class SubbidangQuery {
  static async getAllSubbidang() {
    const res = await db
      .select()
      .from(mSubBidang)
      .orderBy(mSubBidang.idSubBidang);
    return res;
  }
}
