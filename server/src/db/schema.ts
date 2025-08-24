import { 
  serial, 
  text, 
  pgTable, 
  timestamp, 
  integer, 
  boolean, 
  varchar, 
  numeric,
  jsonb,
  real,
  pgEnum
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const complaintStatusEnum = pgEnum('complaint_status', [
  'Baru Masuk',
  'Sedang Diverifikasi', 
  'Dalam Pengerjaan',
  'Selesai Dikerjakan',
  'Ditolak',
  'Dibatalkan'
]);

export const infrastructureStatusEnum = pgEnum('infrastructure_status', [
  'Baru',
  'Verifikasi',
  'Penjadwalan',
  'Pengerjaan',
  'Selesai'
]);

export const priorityEnum = pgEnum('priority', ['Low', 'Medium', 'High', 'Critical']);
export const severityEnum = pgEnum('severity', ['Minor', 'Moderate', 'Major', 'Critical']);
export const newsStatusEnum = pgEnum('news_status', ['Draft', 'Published', 'Scheduled', 'Archived']);
export const announcementPriorityEnum = pgEnum('announcement_priority', ['Low', 'Normal', 'High']);
export const fileTypeEnum = pgEnum('file_type', ['image', 'document', 'video', 'audio']);
export const settingTypeEnum = pgEnum('setting_type', ['string', 'number', 'boolean', 'json']);

// Users Table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  nik: varchar('nik', { length: 16 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  password_hash: text('password_hash').notNull(),
  role_id: integer('role_id').notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  is_deleted: boolean('is_deleted').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  deleted_at: timestamp('deleted_at')
});

// Roles Table
export const rolesTable = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  permissions: jsonb('permissions').notNull().$type<string[]>(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Complaints Table
export const complaintsTable = pgTable('complaints', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  reporter_name: varchar('reporter_name', { length: 255 }).notNull(),
  reporter_email: varchar('reporter_email', { length: 255 }),
  reporter_phone: varchar('reporter_phone', { length: 20 }),
  category: varchar('category', { length: 100 }).notNull(),
  priority: priorityEnum('priority').default('Medium').notNull(),
  status: complaintStatusEnum('status').default('Baru Masuk').notNull(),
  location_address: text('location_address'),
  location_lat: real('location_lat'),
  location_lng: real('location_lng'),
  assigned_to: integer('assigned_to'),
  admin_notes: text('admin_notes'),
  resolution_notes: text('resolution_notes'),
  photos: jsonb('photos').notNull().default('[]').$type<string[]>(),
  attachments: jsonb('attachments').notNull().default('[]').$type<string[]>(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
  resolved_at: timestamp('resolved_at')
});

// Infrastructure Reports Table
export const infrastructureReportsTable = pgTable('infrastructure_reports', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  reporter_name: varchar('reporter_name', { length: 255 }).notNull(),
  reporter_email: varchar('reporter_email', { length: 255 }),
  reporter_phone: varchar('reporter_phone', { length: 20 }),
  infrastructure_type: varchar('infrastructure_type', { length: 100 }).notNull(),
  severity: severityEnum('severity').default('Moderate').notNull(),
  status: infrastructureStatusEnum('status').default('Baru').notNull(),
  location_address: text('location_address'),
  coordinates_lat: real('coordinates_lat'),
  coordinates_lng: real('coordinates_lng'),
  assigned_to: integer('assigned_to'),
  estimated_cost: numeric('estimated_cost', { precision: 15, scale: 2 }),
  actual_cost: numeric('actual_cost', { precision: 15, scale: 2 }),
  scheduled_date: timestamp('scheduled_date'),
  completion_date: timestamp('completion_date'),
  technical_notes: text('technical_notes'),
  photos: jsonb('photos').notNull().default('[]').$type<string[]>(),
  documents: jsonb('documents').notNull().default('[]').$type<string[]>(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// News Table
export const newsTable = pgTable('news', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featured_image: text('featured_image'),
  author_id: integer('author_id').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  tags: jsonb('tags').notNull().default('[]').$type<string[]>(),
  status: newsStatusEnum('status').default('Draft').notNull(),
  is_featured: boolean('is_featured').default(false).notNull(),
  published_at: timestamp('published_at'),
  scheduled_at: timestamp('scheduled_at'),
  views_count: integer('views_count').default(0).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Announcements Table
export const announcementsTable = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  external_link: text('external_link'),
  is_active: boolean('is_active').default(true).notNull(),
  priority: announcementPriorityEnum('priority').default('Normal').notNull(),
  published_at: timestamp('published_at'),
  expires_at: timestamp('expires_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Media Files Table
export const mediaFilesTable = pgTable('media_files', {
  id: serial('id').primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  original_name: varchar('original_name', { length: 255 }).notNull(),
  file_path: text('file_path').notNull(),
  file_size: integer('file_size').notNull(),
  mime_type: varchar('mime_type', { length: 100 }).notNull(),
  file_type: fileTypeEnum('file_type').notNull(),
  uploaded_by: integer('uploaded_by').notNull(),
  alt_text: text('alt_text'),
  caption: text('caption'),
  metadata: jsonb('metadata'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Audit Logs Table
export const auditLogsTable = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'),
  action: varchar('action', { length: 100 }).notNull(),
  resource_type: varchar('resource_type', { length: 100 }).notNull(),
  resource_id: varchar('resource_id', { length: 100 }),
  old_values: jsonb('old_values'),
  new_values: jsonb('new_values'),
  ip_address: varchar('ip_address', { length: 45 }),
  user_agent: text('user_agent'),
  created_at: timestamp('created_at').defaultNow().notNull()
});

// Settings Table
export const settingsTable = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  value: text('value').notNull(),
  type: settingTypeEnum('type').default('string').notNull(),
  group: varchar('group', { length: 50 }),
  description: text('description'),
  is_public: boolean('is_public').default(false).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull()
});

// Relations
export const usersRelations = relations(usersTable, ({ one, many }) => ({
  role: one(rolesTable, {
    fields: [usersTable.role_id],
    references: [rolesTable.id]
  }),
  assignedComplaints: many(complaintsTable),
  assignedInfrastructureReports: many(infrastructureReportsTable),
  authoredNews: many(newsTable),
  uploadedMediaFiles: many(mediaFilesTable),
  auditLogs: many(auditLogsTable)
}));

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  users: many(usersTable)
}));

export const complaintsRelations = relations(complaintsTable, ({ one }) => ({
  assignedUser: one(usersTable, {
    fields: [complaintsTable.assigned_to],
    references: [usersTable.id]
  })
}));

export const infrastructureReportsRelations = relations(infrastructureReportsTable, ({ one }) => ({
  assignedUser: one(usersTable, {
    fields: [infrastructureReportsTable.assigned_to],
    references: [usersTable.id]
  })
}));

export const newsRelations = relations(newsTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [newsTable.author_id],
    references: [usersTable.id]
  })
}));

export const mediaFilesRelations = relations(mediaFilesTable, ({ one }) => ({
  uploader: one(usersTable, {
    fields: [mediaFilesTable.uploaded_by],
    references: [usersTable.id]
  })
}));

export const auditLogsRelations = relations(auditLogsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [auditLogsTable.user_id],
    references: [usersTable.id]
  })
}));

// TypeScript types for the table schemas
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Role = typeof rolesTable.$inferSelect;
export type NewRole = typeof rolesTable.$inferInsert;

export type Complaint = typeof complaintsTable.$inferSelect;
export type NewComplaint = typeof complaintsTable.$inferInsert;

export type InfrastructureReport = typeof infrastructureReportsTable.$inferSelect;
export type NewInfrastructureReport = typeof infrastructureReportsTable.$inferInsert;

export type News = typeof newsTable.$inferSelect;
export type NewNews = typeof newsTable.$inferInsert;

export type Announcement = typeof announcementsTable.$inferSelect;
export type NewAnnouncement = typeof announcementsTable.$inferInsert;

export type MediaFile = typeof mediaFilesTable.$inferSelect;
export type NewMediaFile = typeof mediaFilesTable.$inferInsert;

export type AuditLog = typeof auditLogsTable.$inferSelect;
export type NewAuditLog = typeof auditLogsTable.$inferInsert;

export type Setting = typeof settingsTable.$inferSelect;
export type NewSetting = typeof settingsTable.$inferInsert;

// Export all tables for relation queries
export const tables = {
  users: usersTable,
  roles: rolesTable,
  complaints: complaintsTable,
  infrastructureReports: infrastructureReportsTable,
  news: newsTable,
  announcements: announcementsTable,
  mediaFiles: mediaFilesTable,
  auditLogs: auditLogsTable,
  settings: settingsTable
};