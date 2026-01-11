import { SQL } from "bun";

import dotenv from "dotenv";
dotenv.config({
    path: `.env.development`
});

const pg = new SQL(process.env.DATABASE_URL!);


async function seed() {
    await pg`
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format(
            'TRUNCATE TABLE %I.%I RESTART IDENTITY CASCADE',
            'public',
            r.tablename
        );
    END LOOP;
END $$;
`;

    // 2️⃣ seed transaction
    // await pg`BEGIN`;
    await pg`SET session_replication_role = replica`;
    await pg.file("database/seed-raw/seed-raw.sql");
    await pg`SET session_replication_role = DEFAULT`;
    await pg`COMMIT`;
}

try {
    await seed();
    console.log("🌱 Seeding completed!");
} catch (error) {
    console.error("🌱 Seeding failed!", error);
}