import type { mSkill } from "database/schema";
import { teamSeed } from "./team-seed";


export const skillSeed = [
    {
        idSkill: "a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
        idTeam: teamSeed[0].idTeam,
        namaSkill: "PostgreSQL",
        idSubBidang: "s1",
    },
    {
        idSkill: "b9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
        idTeam: teamSeed[0].idTeam,
        namaSkill: "MySQL",
        idSubBidang: "s1",
    },
    {
        idSkill: "c9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
        idTeam: teamSeed[0].idTeam,
        namaSkill: "SQL Server",
        idSubBidang: "s1",
    },
    {
        idSkill: "d9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
        idTeam: teamSeed[0].idTeam,
        namaSkill: "MongoDB",
        idSubBidang: "s1",
    },
    {
        idSkill: "e9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1",
        idTeam: teamSeed[0].idTeam,
        namaSkill: "Administrasi Linux",
        idSubBidang: "s1",
    },
    {
        idSkill: "d3fba0e6-9b26-4b76-953f-59d847dc5f24",
        idTeam: teamSeed[0].idTeam,
        namaSkill: "Administrasi Windows",
        idSubBidang: "s1",
    },
    // devops
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000001",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Virtual Machine",
        idSubBidang: "s1",
    },
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000002",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Linux Server",
        idSubBidang: "s1",
    },
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000003",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Windows Server",
        idSubBidang: "s1",
    },
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000004",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Web Server",
        idSubBidang: "s1",
    },

    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000005",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Monitoring Server & APM",
        idSubBidang: "s1",
    },

    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000006",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Backup Aplikasi",
        idSubBidang: "s1",
    },
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000007",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Restore Aplikasi",
        idSubBidang: "s1",
    },

    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000008",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Security OS",
        idSubBidang: "s1",
    },

    {
        idSkill: "11111111-aaaa-4aaa-8aaa-000000000009",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Containerization Docker",
        idSubBidang: "s1",
    },
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-00000000000A",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Containerization Kubernetes",
        idSubBidang: "s1",
    },

    {
        idSkill: "11111111-aaaa-4aaa-8aaa-00000000000B",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Git & Gitlab",
        idSubBidang: "s1",
    },

    {
        idSkill: "11111111-aaaa-4aaa-8aaa-00000000000C",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Log Management",
        idSubBidang: "s1",
    },
    {
        idSkill: "11111111-aaaa-4aaa-8aaa-00000000000D",
        idTeam: teamSeed[1].idTeam,
        namaSkill: "Log Analisis",
        idSubBidang: "s1",
    },

] satisfies typeof mSkill.$inferInsert[]

export const mapSkill = Object.fromEntries(skillSeed.map((s) => [s.namaSkill, s.idSkill]));