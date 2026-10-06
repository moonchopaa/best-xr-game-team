import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
export const story = sqliteTable('story', {id:integer('id').primaryKey(), revision:integer('revision').notNull(), content:text('content').notNull(), updatedAt:text('updated_at').notNull()});
export const loginAttempts = sqliteTable('login_attempts', {key:text('key').primaryKey(), attempts:integer('attempts').notNull(), window:integer('window').notNull()});
