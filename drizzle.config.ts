import type { Config } from 'drizzle-kit';

export default {
    schema: './src/db/schema/index.ts',
    out: './src/db/drizzle',
    dialect: 'sqlite',
    driver: 'expo',
} satisfies Config;
