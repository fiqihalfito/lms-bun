import { getSubskillBelumUploadDokumen, mapToExcelRow } from "./getSubskillBelumUploadDokumen"
import * as XLSX from "xlsx"

async function main() {

    const res = await getSubskillBelumUploadDokumen()
    await Bun.write("./test-query/result.json", JSON.stringify(res, null, 2))

    const rows = res.map(mapToExcelRow)

    const sortedRows = rows.sort((a, b) => {
        const teamA = a.picTeam ?? ""
        const teamB = b.picTeam ?? ""
        if (teamA !== teamB) return teamA.localeCompare(teamB)

        const skillA = a.namaSkill ?? ""
        const skillB = b.namaSkill ?? ""
        if (skillA !== skillB) return skillA.localeCompare(skillB)

        const subA = a.namaSubSkill ?? ""
        const subB = b.namaSubSkill ?? ""
        if (subA !== subB) return subA.localeCompare(subB)

        const picA = a.picNama ?? ""
        const picB = b.picNama ?? ""
        return picA.localeCompare(picB)
    })
    // buat worksheet
    const worksheet = XLSX.utils.json_to_sheet(sortedRows)

    // buat workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "SubSkill")

    // simpan file
    XLSX.writeFile(workbook, "subskill.xlsx")
    console.log("✅ subskill.xlsx berhasil dibuat")
    // console.log(JSON.stringify(res, null, 2));

}

try {
    main()
} catch (error) {
    console.log(error)
}