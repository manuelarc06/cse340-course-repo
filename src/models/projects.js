import pool from './db.js';

const getAllProjects = async () => {

    const sql = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            sp.organization_id,
            o.name AS organization_name
        FROM service_projects sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        ORDER BY sp.date;
    `;

    const result = await pool.query(sql);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {

    const sql = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM service_projects
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];

    const result = await pool.query(sql, queryParams);

    return result.rows;
};

// NEW FUNCTION
const getUpcomingProjects = async (number_of_projects) => {

    const sql = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_projects sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.date >= CURRENT_DATE
        ORDER BY sp.date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];

    const result = await pool.query(sql, queryParams);

    return result.rows;
};

// NEW FUNCTION
const getProjectDetails = async (id) => {

    const sql = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM service_projects sp
        JOIN organization o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const queryParams = [id];

    const result = await pool.query(sql, queryParams);

    return result.rows[0];
};

const createProject = async (
    title,
    description,
    location,
    date,
    organizationId
) => {

    const sql = `
        INSERT INTO service_projects
        (
            title,
            description,
            location,
            date,
            organization_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId
    ];

    const result = await pool.query(sql, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    return result.rows[0].project_id;
};

const updateProject = async (
    projectId,
    title,
    description,
    location,
    date,
    organizationId
) => {

    const sql = `
        UPDATE service_projects
        SET
            title = $1,
            description = $2,
            location = $3,
            date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [
        title,
        description,
        location,
        date,
        organizationId,
        projectId
    ];

    const result = await pool.query(sql, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    return result.rows[0].project_id;
};

const addVolunteer = async (projectId, userId) => {

    const sql = `
        INSERT INTO project_volunteers
        (project_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
    `;

    await pool.query(sql, [projectId, userId]);
};

const removeVolunteer = async (projectId, userId) => {

    const sql = `
        DELETE FROM project_volunteers
        WHERE project_id = $1
        AND user_id = $2;
    `;

    await pool.query(sql, [projectId, userId]);
};

const isUserVolunteer = async (projectId, userId) => {

    const sql = `
        SELECT *
        FROM project_volunteers
        WHERE project_id = $1
        AND user_id = $2;
    `;

    const result =
        await pool.query(sql, [projectId, userId]);

    return result.rows.length > 0;
};

const getVolunteerProjectsByUserId = async (userId) => {

    const sql = `
        SELECT
            sp.project_id,
            sp.title,
            sp.date,
            sp.location
        FROM service_projects sp
        JOIN project_volunteers pv
            ON sp.project_id = pv.project_id
        WHERE pv.user_id = $1
        ORDER BY sp.date;
    `;

    const result =
        await pool.query(sql, [userId]);

    return result.rows;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
    addVolunteer,
    removeVolunteer,
    isUserVolunteer,
    getVolunteerProjectsByUserId
};