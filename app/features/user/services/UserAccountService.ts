import type { mUsers } from "database/schema";
import { UserAccountQuery } from "../repo/UserAccount/UserAccountQuery";
import { UserAccountMutation } from "../repo/UserAccount/UserAccountMutation";

export abstract class UserAccountService {
  static async getUserAccountByIdUser(idUser: string) {
    const userAccount = await UserAccountQuery.findUserAccountByIdUser(idUser);
    return userAccount;
  }

  static async saveUserAccount(userAccount: typeof mUsers.$inferInsert) {
    const newIdUser = await UserAccountMutation.insertUserAccount(userAccount);
    return newIdUser;
  }

  static async getUserByEmail(email: string) {
    const res = await UserAccountQuery.findUserByEmail(email);
    return res;
  }
}
