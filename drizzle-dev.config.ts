import { defineConfig } from 'drizzle-kit';

import dotenv from 'dotenv';
dotenv.config({
    path: `.env.development`
    // path: `.env.production`
});

export default defineConfig({
    out: './drizzle-dev',
    schema: './database/schema/*',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
