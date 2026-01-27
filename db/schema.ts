import {
  pgTable,
  serial,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const businessTypeEnum = pgEnum("business_type", [
  "sole_proprietorship",
  "llp_partnership",
  "private_limited",
  "unregistered",
]);

export const turnoverRangeEnum = pgEnum("turnover_range", [
  "below_50l",
  "50l_to_2cr",
  "2cr_to_5cr",
  "above_5cr",
]);

export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull().unique(),
  businessType: businessTypeEnum("business_type").notNull(),
  turnoverRange: turnoverRangeEnum("turnover_range").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
export type NewWaitlistEntry = typeof waitlistEntries.$inferInsert;
