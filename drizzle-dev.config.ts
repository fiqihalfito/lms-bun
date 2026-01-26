import { defineConfig } from 'drizzle-kit';

import dotenv from 'dotenv';
dotenv.config({
    path: `.env.production`
});

export default defineConfig({
    out: './drizzle-dev',
    schema: './database/schema/index.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
