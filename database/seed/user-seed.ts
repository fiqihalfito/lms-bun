import type { mTeamMember, mUserProfiles, mUsers } from "database/schema";
import { teamSeed } from "./team-seed";
import { mapRoleSeed } from "./role-seed";

const hashedPassword = await Bun.password.hash("1234");

export const usersSeed = [
    // LMS
    { idSubBidang: "s1", idUser: "84d9a71a-995c-471b-ae21-f77c4fc170e8", email: "dicky.arief@iconpln.co.id", namaUser: "Dicky Arief Widiarno", password: hashedPassword, idTeam: null, idRole: mapRoleSeed.get("Pegawai")! },
    { idSubBidang: "s1", idUser: "25ef3da6-87d9-4348-b576-e3c73b5c287d", email: "herri.apristanto@iconpln.co.id", namaUser: "Herri Nur Apristanto", password: hashedPassword, idTeam: null, idRole: mapRoleSeed.get("Pegawai")! },
    { idSubBidang: "s1", idUser: "891e36e0-8e84-4914-9842-54db93ec567d", email: "fiqih.alfito@iconpln.co.id", namaUser: "Fiqih Alfito", password: hashedPassword, idTeam: null, idRole: mapRoleSeed.get("Pegawai")! },
    { idSubBidang: "s1", idUser: "64ac08c3-8e76-4536-8301-7516b64724d8", email: "vickya.ramadhan@iconpln.co.id", namaUser: "M. Vickya Ramadhan", password: hashedPassword, idTeam: null, idRole: mapRoleSeed.get("Pegawai")! },

    // DBA (20)
    { idSubBidang: "s1", idUser: "76772c22-0c94-4a67-aeea-41639741d855", email: "hananta.prasetia@iconpln.co.id", namaUser: "Hananta Prasetia", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "ee1b41ee-7ad3-428a-a502-66d945b9307d", email: "asdin.pamungkas@iconpln.co.id", namaUser: "Asdin Wahyu Pamungkas", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "04577662-ed90-4166-9f9a-6f1678562205", email: "fahri.firmansyah@iconpln.co.id", namaUser: "Fahri Bagus Firmansyah", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "8a623469-4b42-4bf2-8bd9-7dc38ce10f5d", email: "ando.wibawa@iconpln.co.id", namaUser: "Ando Pratama Wibawa", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "9870e2cd-6003-43f0-93a0-a281061aed36", email: "andi.jalil@iconpln.co.id", namaUser: "Andi Abd. Jalil", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "c5c966fa-5081-462f-b0d5-493addfe7131", email: "muhammad.hakim@iconpln.co.id", namaUser: "Muhammad Ridha HAKIM", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "8e033bc1-25bb-404f-a28a-9c9d869a81f6", email: "latif.irfanto@iconpln.co.id", namaUser: "Latif Unggul Irfanto", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "f909ec77-82c1-4b55-8561-13d6c3ecc5c1", email: "dwiky.melinia@iconpln.co.id", namaUser: "Dwiky Melinia Eriani", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "f39001d8-c3fa-4b28-ab03-e5cf2af38b97", email: "kamila.aprilia@iconpln.co.id", namaUser: "Kamila Aprilia", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "d74ab3a7-dd4d-43dc-a816-2eece5fdd11b", email: "rizky.ramdani@iconpln.co.id", namaUser: "Rizky Ramdani", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "c911c042-c636-4d6d-8437-064106ef74f0", email: "doand.panjaitan@iconpln.co.id", namaUser: "Doand Panjaitan", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "06c65ea5-3b99-455c-bbe5-a9cd4311fe42", email: "bayu.sulistyo@iconpln.co.id", namaUser: "Bayu Tri Sulistyo", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "4d242348-3f78-47a0-9282-b0ecd9ccbb66", email: "achmad.ridwan@iconpln.co.id", namaUser: "Achmad Ridwan", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "3129720e-c412-45c4-93f4-e7671e0c4e5d", email: "ikrar.harvy@iconpln.co.id", namaUser: "Ikrar Harvy", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "3f17bfdb-c548-4a0c-a4aa-6de2f97c6da7", email: "nabila.fidasari@iconpln.co.id", namaUser: "Nabila Fidasari", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "3039d395-0760-4361-9476-154e3dfdfbe1", email: "mahrunisa.indah@iconpln.co.id", namaUser: "Mahrunisa Indah", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "379ecd94-9670-4fa2-8531-18ff14f3c47b", email: "citra.hafitasari@iconpln.co.id", namaUser: "Citra Hafitasari", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "e13ada46-0fd2-4d8d-91e8-4fe861c34cfd", email: "felisia.maria@iconpln.co.id", namaUser: "Felisia Mascarehas", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "504ee8ff-8718-4635-8880-3d939894d736", email: "lucky.ardiansyah@iconpln.co.id", namaUser: "Lucky Ardiansyah", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "8b703e47-0a2e-4d7a-b05a-bccffa603ef7", email: "yafi.zuhdi@iconpln.co.id", namaUser: "Yafi Irfan Zuhdi", password: hashedPassword, idTeam: teamSeed[0].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },

    // DEVOPS (20)
    { idSubBidang: "s1", idUser: "7270d3e9-e4b5-4475-986e-4d99c1f0a572", email: "ayu.pebriani@iconpln.co.id", namaUser: "Ayu Pebriani", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "3033f84d-7de4-4524-a21d-39d453884a0a", email: "sekar.sari@iconpln.co.id", namaUser: "Sekar Melati Arum Sari", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "9f42c1c4-0813-4ea5-8cf8-aacefee73d97", email: "agnesia.indryany@iconpln.co.id", namaUser: "Agnesia Indryany Mangopo", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "b08450b9-9101-4d13-b8ac-55bfce6a454f", email: "alia.argasah@iconpln.co.id", namaUser: "Alia Ahadi Argasah", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "3d0ca79d-a112-4cac-99d9-674aa94c49b3", email: "agung.febriyanto@iconpln.co.id", namaUser: "Agung Ramadhan Febrianto", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "f1668085-ddf3-4e80-a437-175af4c4b1bc", email: "oktori.nugroho@iconpln.co.id", namaUser: "Oktori Thio Nugroho", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "aa61d359-2f5e-4231-905a-314552f7e2ae", email: "andika.putra@iconpln.co.id", namaUser: "Andika Putra", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "3012d838-39bf-48d9-a2ba-e3c2c492e532", email: "tedi.mahendra@iconpln.co.id", namaUser: "Tedi Mahendra", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "a57b5835-848a-4212-8e17-161033d5dd24", email: "afrizal.zulfikar@iconpln.co.id", namaUser: "Afrizal Aulia Zulfikar", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "402744a2-96b3-4e3a-937f-dd4be8f17737", email: "fajri.syarief@iconpln.co.id", namaUser: "Fajri Nur Syarif", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "40e21ba3-d81b-4504-a827-6cc44b87a638", email: "rizkia.romainur@iconpln.co.id", namaUser: "Rizkia Kamila Romainur", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "913cbe71-3bb2-4846-ae4f-ed971c553a15", email: "muamar.muamar@iconpln.co.id", namaUser: "Muamar", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "7b56fa9c-0e1e-4875-a394-e40b8f26dca0", email: "agung.surya@iconpln.co.id", namaUser: "Agung Surya Nugraha", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "26801fda-09c8-4e93-94a0-28849b3984d0", email: "eduward.situmorang@iconpln.co.id", namaUser: "Eduward S.", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "a424933d-3162-459f-a6a1-b0974307fb11", email: "muhammad.ikhwan@iconpln.co.id", namaUser: "Muhammad Ikhwan Perwira", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "94c88935-c0da-4dba-a582-62ac8987c2f7", email: "alivia.prameswari@iconpln.co.id", namaUser: "Alivia Paradhita Prameswari", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "1614881b-24d5-424a-b4db-39784e5a9aa1", email: "lutfiah.sumardi@iconpln.co.id", namaUser: "Lutfiah Sania Sumardi", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "84f6d8fc-43ac-4667-9704-25ab0c7ced27", email: "gloria.putri@iconpln.co.id", namaUser: "Gloria Jelita Putri Meisya Nugroho", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "72255456-86e9-44c7-9f02-33680c516890", email: "annisya.safira@iconpln.co.id", namaUser: "Annisya Amanda Safira", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
    { idSubBidang: "s1", idUser: "5cb83cc1-818c-4a54-b59a-0282b491eb5e", email: "muhamad.misbahudin@iconpln.co.id", namaUser: "Muhamad Misbahudin Sobirin", password: hashedPassword, idTeam: teamSeed[1].idTeam, idRole: mapRoleSeed.get("Tenaga Alih Daya")! },
] as const satisfies (typeof mUsers.$inferInsert & typeof mUserProfiles.$inferInsert & typeof mTeamMember.$inferInsert)[]

// export const mapUserSeed = new Map(usersSeed.map(user => [user.email, user.idUser]));
export const mapUserSeed = Object.fromEntries(usersSeed.map(user => [user.email, user.idUser]));