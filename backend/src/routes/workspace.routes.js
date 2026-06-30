import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
  inviteMember,
  updateMemberRole,
  removeMember,
} from '../controllers/workspace.controller.js';
import {
  validate,
  createWorkspaceSchema,
  updateWorkspaceSchema,
  workspaceIdSchema,
  inviteMemberSchema,
  updateMemberRoleSchema,
} from '../validations/workspace.validation.js';

const router = express.Router();

// All workspace routes require authentication
router.use(protect);

// Workspace CRUD
router.post('/', validate(createWorkspaceSchema), createWorkspace);
router.get('/', getUserWorkspaces);
router.get('/:workspaceId', validate(workspaceIdSchema), getWorkspaceById);
router.patch('/:workspaceId', validate(updateWorkspaceSchema), updateWorkspace);
router.delete('/:workspaceId', validate(workspaceIdSchema), deleteWorkspace);

// Workspace member management
router.get('/:workspaceId/members', validate(workspaceIdSchema), getWorkspaceMembers);
router.post('/:workspaceId/members', validate(inviteMemberSchema), inviteMember);
router.put('/:workspaceId/members/:memberId', validate(updateMemberRoleSchema), updateMemberRole);
router.delete('/:workspaceId/members/:memberId', validate(workspaceIdSchema), removeMember);

export default router;
