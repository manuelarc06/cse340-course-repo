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
    projectValidation,
    volunteerForProject,
    unVolunteerForProject
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

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
} from './controllers/users.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

// Show form
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Process form
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);

// Show edit form
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// Process edit form
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/project/:id/volunteer', requireLogin, volunteerForProject);

router.get('/project/:id/unvolunteer', requireLogin, unVolunteerForProject);

// Show new project form
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Process new project form
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Show edit project form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Process edit project form
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

// Show create category form
router.get('/new-category', requireRole('admin'), showNewCategoryForm);

// Process create category
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

// Show edit category form
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

// Process edit category
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// Show assign categories form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);

// Process assign categories form
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// User registration routes
router.get(
    '/register',
    showUserRegistrationForm
);

router.post(
    '/register',
    processUserRegistrationForm
);

// Login routes
router.get(
    '/login',
    showLoginForm
);

router.post(
    '/login',
    processLoginForm
);

router.get(
    '/logout',
    processLogout
);

// Protected dashboard route
router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

router.get(
    '/users',
    requireRole('admin'),
    showUsersPage
);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;