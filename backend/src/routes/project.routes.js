import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createProject,
  getWorkspaceProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMember,
  updateProjectMemberRole,
  removeProjectMember,
} from '../controllers/project.controller.js';
import {
  validate,
  createProjectSchema,
  updateProjectSchema,
  projectIdSchema,
  addProjectMemberSchema,
  updateProjectMemberRoleSchema,
} from '../validations/project.validation.js';

const router = express.Router();

// All project routes require authentication
router.use(protect);

// Projects within a workspace
router.post('/workspace/:workspaceId', validate(createProjectSchema), createProject);
router.get('/workspace/:workspaceId', getWorkspaceProjects);

// Single project CRUD
router.get('/:projectId', validate(projectIdSchema), getProjectById);
router.put('/:projectId', validate(updateProjectSchema), updateProject);
router.delete('/:projectId', validate(projectIdSchema), deleteProject);

// Project member management
router.get('/:projectId/members', validate(projectIdSchema), getProjectMembers);
router.post('/:projectId/members', validate(addProjectMemberSchema), addProjectMember);
router.put('/:projectId/members/:memberId', validate(updateProjectMemberRoleSchema), updateProjectMemberRole);
router.delete('/:projectId/members/:memberId', validate(projectIdSchema), removeProjectMember);

export default router;
