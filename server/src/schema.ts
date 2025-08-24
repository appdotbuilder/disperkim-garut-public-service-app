import { z } from 'zod';

// User Management Schemas
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  nik: z.string(),
  phone: z.string(),
  password_hash: z.string(),
  role_id: z.number(),
  is_active: z.boolean(),
  is_deleted: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable()
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  nik: z.string().min(16).max(16),
  phone: z.string(),
  password: z.string().min(8),
  role_id: z.number()
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  nik: z.string().optional(),
  phone: z.string().optional(),
  role_id: z.number().optional(),
  is_active: z.boolean().optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

// Roles & Permissions Schemas
export const roleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.array(z.string()),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Role = z.infer<typeof roleSchema>;

export const createRoleInputSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  permissions: z.array(z.string())
});

export type CreateRoleInput = z.infer<typeof createRoleInputSchema>;

// Complaint Status Enum
export const complaintStatusEnum = z.enum([
  'Baru Masuk',
  'Sedang Diverifikasi', 
  'Dalam Pengerjaan',
  'Selesai Dikerjakan',
  'Ditolak',
  'Dibatalkan'
]);

export type ComplaintStatus = z.infer<typeof complaintStatusEnum>;

// Complaints Management Schemas
export const complaintSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  reporter_name: z.string(),
  reporter_email: z.string().email().nullable(),
  reporter_phone: z.string().nullable(),
  category: z.string(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: complaintStatusEnum,
  location_address: z.string().nullable(),
  location_lat: z.number().nullable(),
  location_lng: z.number().nullable(),
  assigned_to: z.number().nullable(),
  admin_notes: z.string().nullable(),
  resolution_notes: z.string().nullable(),
  photos: z.array(z.string()),
  attachments: z.array(z.string()),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  resolved_at: z.coerce.date().nullable()
});

export type Complaint = z.infer<typeof complaintSchema>;

export const createComplaintInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  reporter_name: z.string().min(1),
  reporter_email: z.string().email().optional(),
  reporter_phone: z.string().optional(),
  category: z.string(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).default('Medium'),
  location_address: z.string().optional(),
  location_lat: z.number().optional(),
  location_lng: z.number().optional(),
  photos: z.array(z.string()).default([]),
  attachments: z.array(z.string()).default([])
});

export type CreateComplaintInput = z.infer<typeof createComplaintInputSchema>;

export const updateComplaintInputSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  status: complaintStatusEnum.optional(),
  assigned_to: z.number().nullable().optional(),
  admin_notes: z.string().nullable().optional(),
  resolution_notes: z.string().nullable().optional()
});

export type UpdateComplaintInput = z.infer<typeof updateComplaintInputSchema>;

// Infrastructure Status Enum
export const infrastructureStatusEnum = z.enum([
  'Baru',
  'Verifikasi',
  'Penjadwalan',
  'Pengerjaan',
  'Selesai'
]);

export type InfrastructureStatus = z.infer<typeof infrastructureStatusEnum>;

// Infrastructure Reports Schemas
export const infrastructureReportSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  reporter_name: z.string(),
  reporter_email: z.string().email().nullable(),
  reporter_phone: z.string().nullable(),
  infrastructure_type: z.string(),
  severity: z.enum(['Minor', 'Moderate', 'Major', 'Critical']),
  status: infrastructureStatusEnum,
  location_address: z.string().nullable(),
  coordinates_lat: z.number().nullable(),
  coordinates_lng: z.number().nullable(),
  assigned_to: z.number().nullable(),
  estimated_cost: z.number().nullable(),
  actual_cost: z.number().nullable(),
  scheduled_date: z.coerce.date().nullable(),
  completion_date: z.coerce.date().nullable(),
  technical_notes: z.string().nullable(),
  photos: z.array(z.string()),
  documents: z.array(z.string()),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type InfrastructureReport = z.infer<typeof infrastructureReportSchema>;

export const createInfrastructureReportInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  reporter_name: z.string().min(1),
  reporter_email: z.string().email().optional(),
  reporter_phone: z.string().optional(),
  infrastructure_type: z.string(),
  severity: z.enum(['Minor', 'Moderate', 'Major', 'Critical']).default('Moderate'),
  location_address: z.string().optional(),
  coordinates_lat: z.number().optional(),
  coordinates_lng: z.number().optional(),
  photos: z.array(z.string()).default([]),
  documents: z.array(z.string()).default([])
});

export type CreateInfrastructureReportInput = z.infer<typeof createInfrastructureReportInputSchema>;

// News Management Schemas
export const newsSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string().nullable(),
  content: z.string(),
  excerpt: z.string().nullable(),
  featured_image: z.string().nullable(),
  author_id: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  status: z.enum(['Draft', 'Published', 'Scheduled', 'Archived']),
  is_featured: z.boolean(),
  published_at: z.coerce.date().nullable(),
  scheduled_at: z.coerce.date().nullable(),
  views_count: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type News = z.infer<typeof newsSchema>;

export const createNewsInputSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  featured_image: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  status: z.enum(['Draft', 'Published', 'Scheduled']).default('Draft'),
  is_featured: z.boolean().default(false),
  scheduled_at: z.coerce.date().optional()
});

export type CreateNewsInput = z.infer<typeof createNewsInputSchema>;

// Announcements Schemas
export const announcementSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  external_link: z.string().nullable(),
  is_active: z.boolean(),
  priority: z.enum(['Low', 'Normal', 'High']),
  published_at: z.coerce.date().nullable(),
  expires_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Announcement = z.infer<typeof announcementSchema>;

export const createAnnouncementInputSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.string(),
  external_link: z.string().url().optional(),
  priority: z.enum(['Low', 'Normal', 'High']).default('Normal'),
  published_at: z.coerce.date().optional(),
  expires_at: z.coerce.date().optional()
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementInputSchema>;

// Media Library Schemas
export const mediaFileSchema = z.object({
  id: z.number(),
  filename: z.string(),
  original_name: z.string(),
  file_path: z.string(),
  file_size: z.number(),
  mime_type: z.string(),
  file_type: z.enum(['image', 'document', 'video', 'audio']),
  uploaded_by: z.number(),
  alt_text: z.string().nullable(),
  caption: z.string().nullable(),
  metadata: z.record(z.any()).nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type MediaFile = z.infer<typeof mediaFileSchema>;

export const uploadMediaInputSchema = z.object({
  filename: z.string(),
  original_name: z.string(),
  file_path: z.string(),
  file_size: z.number(),
  mime_type: z.string(),
  file_type: z.enum(['image', 'document', 'video', 'audio']),
  alt_text: z.string().optional(),
  caption: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export type UploadMediaInput = z.infer<typeof uploadMediaInputSchema>;

// Audit Log Schemas
export const auditLogSchema = z.object({
  id: z.number(),
  user_id: z.number().nullable(),
  action: z.string(),
  resource_type: z.string(),
  resource_id: z.string().nullable(),
  old_values: z.record(z.any()).nullable(),
  new_values: z.record(z.any()).nullable(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  created_at: z.coerce.date()
});

export type AuditLog = z.infer<typeof auditLogSchema>;

export const createAuditLogInputSchema = z.object({
  user_id: z.number().optional(),
  action: z.string(),
  resource_type: z.string(),
  resource_id: z.string().optional(),
  old_values: z.record(z.any()).optional(),
  new_values: z.record(z.any()).optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional()
});

export type CreateAuditLogInput = z.infer<typeof createAuditLogInputSchema>;

// Settings Schemas
export const settingSchema = z.object({
  id: z.number(),
  key: z.string(),
  value: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'json']),
  group: z.string().nullable(),
  description: z.string().nullable(),
  is_public: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Setting = z.infer<typeof settingSchema>;

export const updateSettingInputSchema = z.object({
  key: z.string(),
  value: z.string(),
  type: z.enum(['string', 'number', 'boolean', 'json']).optional(),
  group: z.string().optional(),
  description: z.string().optional(),
  is_public: z.boolean().optional()
});

export type UpdateSettingInput = z.infer<typeof updateSettingInputSchema>;

// Common query schemas
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10)
});

export type PaginationInput = z.infer<typeof paginationSchema>;

export const searchSchema = z.object({
  query: z.string().optional(),
  filters: z.record(z.any()).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10)
});

export type SearchInput = z.infer<typeof searchSchema>;

// Optional search schema for endpoints that don't require parameters
export const optionalSearchSchema = searchSchema.partial().default({});

export type OptionalSearchInput = z.infer<typeof optionalSearchSchema>;