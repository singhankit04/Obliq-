import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import {
  createTask,
  getProjectTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import {
  validate,
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from '../validations/task.validation.js';

const router = express.Router();

// All task routes require authentication
router.use(protect);

// Tasks within a project
router.post('/project/:projectId', validate(createTaskSchema), createTask);
router.get('/project/:projectId', getProjectTasks);

// Single task CRUD
router.get('/:taskId', validate(taskIdSchema), getTaskById);
router.put('/:taskId', validate(updateTaskSchema), updateTask);
router.delete('/:taskId', validate(taskIdSchema), deleteTask);

export default router;
