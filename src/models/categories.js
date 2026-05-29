import db from "./db.js";

export async function getAllCategories() {

    const result = await db.query(
        "SELECT * FROM categories ORDER BY name"
    );

    return result.rows;
}

export async function getCategoryById(id) {

    const sql = `
        SELECT
            category_id,
            name
        FROM categories
        WHERE category_id = $1;
    `;

    const result = await db.query(sql, [id]);

    return result.rows[0];
}

export async function getCategoriesByProjectId(projectId) {

    const sql = `
        SELECT
            c.category_id,
            c.name
        FROM categories c
        JOIN project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const result = await db.query(sql, [projectId]);

    return result.rows;
}

export async function getProjectsByCategoryId(categoryId) {

    const sql = `
        SELECT
            sp.project_id,
            sp.title
        FROM service_projects sp
        JOIN project_categories pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.title;
    `;

    const result = await db.query(sql, [categoryId]);

    return result.rows;
}

async function assignCategoryToProject(categoryId, projectId) {

    const sql = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(sql, [categoryId, projectId]);
}

export async function updateCategoryAssignments(projectId, categoryIds) {

    const deleteSql = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;

    await db.query(deleteSql, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}