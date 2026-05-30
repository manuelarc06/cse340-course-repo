import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';

import { body, validationResult }
    from 'express-validator';

const categoryValidation = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')

        .isLength({
            min: 3,
            max: 100
        })

        .withMessage(
            'Category name must be between 3 and 100 characters'
        )
];

const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Categories';

    res.render('categories', {
        title,
        categories
    });
};

const showCategoryDetailsPage = async (req, res) => {

    const id = req.params.id;

    const category = await getCategoryById(id);

    const projects = await getProjectsByCategoryId(id);

    const title = category.name;

    res.render('category', {
        title,
        category,
        projects
    });
};

const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);

    const categories = await getAllCategories();

    const assignedCategories =
        await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const selectedCategoryIds = req.body.categoryIds || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(
        projectId,
        categoryIdsArray
    );

    req.flash(
        'success',
        'Categories updated successfully.'
    );

    res.redirect(`/project/${projectId}`);
};


const showNewCategoryForm = async (req, res) => {

    res.render(
        'new-category',
        {
            title: 'Create Category'
        }
    );
};

const processNewCategoryForm =
    async (req, res) => {

        const errors =
            validationResult(req);

        if (!errors.isEmpty()) {

            errors.array().forEach(error => {
                req.flash(
                    'error',
                    error.msg
                );
            });

            return res.redirect(
                '/new-category'
            );
        }

        const { name } = req.body;

        const categoryId =
            await createCategory(name);

        req.flash(
            'success',
            'Category created successfully.'
        );

        res.redirect(
            `/category/${categoryId}`
        );
    };

const showEditCategoryForm =
    async (req, res) => {

        const category =
            await getCategoryById(
                req.params.id
            );

        res.render(
            'edit-category',
            {
                title: 'Edit Category',
                category
            }
        );
    };

const processEditCategoryForm =
    async (req, res) => {

        const errors =
            validationResult(req);

        if (!errors.isEmpty()) {

            errors.array().forEach(error => {
                req.flash(
                    'error',
                    error.msg
                );
            });

            return res.redirect(
                '/edit-category/' +
                req.params.id
            );
        }

        const { name } = req.body;

        await updateCategory(
            req.params.id,
            name
        );

        req.flash(
            'success',
            'Category updated successfully.'
        );

        res.redirect(
            '/category/' +
            req.params.id
        );
    };

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};