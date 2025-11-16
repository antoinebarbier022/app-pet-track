import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const pets = sqliteTable('pets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  type: text('type', { enum: ['dog', 'cat', 'rabbit'] }).notNull(),
  birthDate: integer('birth_date', { mode: 'timestamp_ms' }).notNull(),
});

export const weights = sqliteTable('weights', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  petId: integer('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  recordedAt: integer('recorded_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
  weightKg: real('weight_kg').notNull(),
});
