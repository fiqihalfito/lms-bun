import { Client, InvalidCredentialsError } from "ldapts";

const LDAP_URL = "ldap://ldap.iconpln.co.id";
const BASE_DN = "DC=iconpln,DC=co,DC=id";

const ldapClient = new Client({
    url: LDAP_URL,
    timeout: 5000,
    connectTimeout: 5000,
});



export async function loginLdap(email: string, password: string) {
    try {
        await ldapClient.bind(email, password)
        console.log("bind success");

        const { searchEntries, searchReferences } = await ldapClient.search(BASE_DN, {
            scope: 'sub',
            filter: `mail=${email}`,
        });
        console.log("searchEntries", searchEntries)
        return searchEntries.length > 0
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            throw new Error("Email atau Password salah!")
        }
        throw new Error("User tidak ditemukan!")
    } finally {
        await ldapClient.unbind()
    }
}
