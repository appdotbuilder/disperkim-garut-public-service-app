import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  createUserInputSchema,
  updateUserInputSchema,
  createRoleInputSchema,
  createComplaintInputSchema,
  updateComplaintInputSchema,
  createInfrastructureReportInputSchema,
  createNewsInputSchema,
  createAnnouncementInputSchema,
  uploadMediaInputSchema,
  createAuditLogInputSchema,
  updateSettingInputSchema,
  searchSchema,
  optionalSearchSchema,
  paginationSchema
} from './schema';

// Import handlers
import { createUser } from './handlers/create_user';
import { getUsers, getUserById } from './handlers/get_users';
import { updateUser, deleteUser, resetUserPassword } from './handlers/update_user';
import { createRole } from './handlers/create_role';
import { getRoles, getRoleById } from './handlers/get_roles';
import { createComplaint } from './handlers/create_complaint';
import { getComplaints, getComplaintById, getComplaintsByStatus } from './handlers/get_complaints';
import { updateComplaint, assignComplaint } from './handlers/update_complaint';
import { createInfrastructureReport } from './handlers/create_infrastructure_report';
import { getInfrastructureReports, getInfrastructureReportById, getInfrastructureReportsByStatus } from './handlers/get_infrastructure_reports';
import { createNews } from './handlers/create_news';
import { getNews, getNewsById, getPublishedNews, getFeaturedNews } from './handlers/get_news';
import { createAnnouncement } from './handlers/create_announcement';
import { getAnnouncements, getActiveAnnouncements, getAnnouncementById } from './handlers/get_announcements';
import { uploadMedia } from './handlers/upload_media';
import { getMediaFiles, getMediaFileById, deleteMediaFile } from './handlers/get_media_files';
import { createAuditLog } from './handlers/create_audit_log';
import { getAuditLogs, getAuditLogsByResource, getAuditLogsByUser } from './handlers/get_audit_logs';
import { getSettings, getPublicSettings, getSettingByKey } from './handlers/get_settings';
import { updateSetting, updateMultipleSettings } from './handlers/update_settings';
import { z } from 'zod';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // User Management Routes
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),

  getUsers: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getUsers(input)),

  getUserById: publicProcedure
    .input(z.number())
    .query(({ input }) => getUserById(input)),

  updateUser: publicProcedure
    .input(updateUserInputSchema)
    .mutation(({ input }) => updateUser(input)),

  deleteUser: publicProcedure
    .input(z.number())
    .mutation(({ input }) => deleteUser(input)),

  resetUserPassword: publicProcedure
    .input(z.number())
    .mutation(({ input }) => resetUserPassword(input)),

  // Role Management Routes
  createRole: publicProcedure
    .input(createRoleInputSchema)
    .mutation(({ input }) => createRole(input)),

  getRoles: publicProcedure
    .query(() => getRoles()),

  getRoleById: publicProcedure
    .input(z.number())
    .query(({ input }) => getRoleById(input)),

  // Complaint Management Routes
  createComplaint: publicProcedure
    .input(createComplaintInputSchema)
    .mutation(({ input }) => createComplaint(input)),

  getComplaints: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getComplaints(input)),

  getComplaintById: publicProcedure
    .input(z.number())
    .query(({ input }) => getComplaintById(input)),

  getComplaintsByStatus: publicProcedure
    .input(z.string())
    .query(({ input }) => getComplaintsByStatus(input)),

  updateComplaint: publicProcedure
    .input(updateComplaintInputSchema)
    .mutation(({ input }) => updateComplaint(input)),

  assignComplaint: publicProcedure
    .input(z.object({ complaintId: z.number(), userId: z.number() }))
    .mutation(({ input }) => assignComplaint(input.complaintId, input.userId)),

  // Infrastructure Report Routes
  createInfrastructureReport: publicProcedure
    .input(createInfrastructureReportInputSchema)
    .mutation(({ input }) => createInfrastructureReport(input)),

  getInfrastructureReports: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getInfrastructureReports(input)),

  getInfrastructureReportById: publicProcedure
    .input(z.number())
    .query(({ input }) => getInfrastructureReportById(input)),

  getInfrastructureReportsByStatus: publicProcedure
    .input(z.string())
    .query(({ input }) => getInfrastructureReportsByStatus(input)),

  // News Management Routes
  createNews: publicProcedure
    .input(createNewsInputSchema.extend({ authorId: z.number() }))
    .mutation(({ input }) => createNews(input, input.authorId)),

  getNews: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getNews(input)),

  getNewsById: publicProcedure
    .input(z.number())
    .query(({ input }) => getNewsById(input)),

  getPublishedNews: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getPublishedNews(input)),

  getFeaturedNews: publicProcedure
    .input(z.number().optional())
    .query(({ input }) => getFeaturedNews(input)),

  // Announcement Routes
  createAnnouncement: publicProcedure
    .input(createAnnouncementInputSchema)
    .mutation(({ input }) => createAnnouncement(input)),

  getAnnouncements: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getAnnouncements(input)),

  getActiveAnnouncements: publicProcedure
    .query(() => getActiveAnnouncements()),

  getAnnouncementById: publicProcedure
    .input(z.number())
    .query(({ input }) => getAnnouncementById(input)),

  // Media Library Routes
  uploadMedia: publicProcedure
    .input(uploadMediaInputSchema.extend({ uploaderId: z.number() }))
    .mutation(({ input }) => uploadMedia(input, input.uploaderId)),

  getMediaFiles: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getMediaFiles(input)),

  getMediaFileById: publicProcedure
    .input(z.number())
    .query(({ input }) => getMediaFileById(input)),

  deleteMediaFile: publicProcedure
    .input(z.number())
    .mutation(({ input }) => deleteMediaFile(input)),

  // Audit Log Routes
  createAuditLog: publicProcedure
    .input(createAuditLogInputSchema)
    .mutation(({ input }) => createAuditLog(input)),

  getAuditLogs: publicProcedure
    .input(optionalSearchSchema)
    .query(({ input }) => getAuditLogs(input)),

  getAuditLogsByResource: publicProcedure
    .input(z.object({ resourceType: z.string(), resourceId: z.string() }))
    .query(({ input }) => getAuditLogsByResource(input.resourceType, input.resourceId)),

  getAuditLogsByUser: publicProcedure
    .input(z.object({ userId: z.number() }).merge(searchSchema))
    .query(({ input }) => getAuditLogsByUser(input.userId, input)),

  // Settings Routes
  getSettings: publicProcedure
    .input(z.string().optional())
    .query(({ input }) => getSettings(input)),

  getPublicSettings: publicProcedure
    .query(() => getPublicSettings()),

  getSettingByKey: publicProcedure
    .input(z.string())
    .query(({ input }) => getSettingByKey(input)),

  updateSetting: publicProcedure
    .input(updateSettingInputSchema)
    .mutation(({ input }) => updateSetting(input)),

  updateMultipleSettings: publicProcedure
    .input(z.array(updateSettingInputSchema))
    .mutation(({ input }) => updateMultipleSettings(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();