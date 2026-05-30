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
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
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

// Show edit project form
router.get(
    '/edit-project/:id',
    showEditProjectForm
);

// Process edit project form
router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

// Show create category form
router.get(
    '/new-category',
    showNewCategoryForm
);

// Process create category
router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

// Show edit category form
router.get(
    '/edit-category/:id',
    showEditCategoryForm
);

// Process edit category
router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);

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