import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    showEditOrganizationForm,
    processEditOrganizationForm,
    organizationValidation
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

// Show form
router.get('/new-organization', showNewOrganizationForm);

// Process form
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Show edit form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Process edit form
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

// Show new project form
router.get('/new-project', showNewProjectForm);

// Process new project form
router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

// Show assign categories form
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

// Process assign categories form
router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;