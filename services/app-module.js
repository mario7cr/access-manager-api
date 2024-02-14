const db = require('../services/db');

function validateCreate(payload) {
  let messages = [];

  for (const viewAccess of payload) {
    if (!viewAccess.appModuleViewId) {
      messages.push('appModuleViewId is required');
    }

    if (!viewAccess.relationId) {
      messages.push('relationId is required');
    }

    if (!viewAccess.relationTypeId) {
      messages.push('relationTypeId is required');
    }

    if (messages.length) {
      let error = new Error(messages.join());
      error.statusCode = 400;
  
      throw error;
    }
  }
}

async function getViewAccess(params) {
  let sql = 'SELECT * FROM appModuleViewAccess WHERE 1 = 1';

  if (params?.appModuleViewId) {
    sql += ` AND appModuleViewId = ${params.appModuleViewId}`;
  }

  if (params?.userId) {
    sql += ` AND userId = ${params.userId}`;
  }

  if (params?.relationId) {
    sql += ` AND relationId = ${params.relationId}`;
  }

  if (params?.relationTypeId) {
    sql += ` AND relationTypeId = ${params.relationTypeId}`;
  }

  return {
    notificationKeys: [],
    data: await db.query(sql)
  }
}

async function createViewAccess(payload) {
  validateCreate(payload);

  const notificationKeys = [];
  const response = [];

  for (const viewAccess of payload) {
    const {appModuleViewId, userId, relationId, relationTypeId, accessLevel} = viewAccess;
    const result = await db.run(
      'INSERT INTO appModuleViewAccess (appModuleViewId, userId, relationId, relationTypeId, accessLevel)' + 
      ' VALUES (?, ?, ?, ?, ?)', 
      [appModuleViewId, userId, relationId, relationTypeId, accessLevel]
    );

    if (!result.changes) {
      notificationKeys.push('Error in creating appModuleViewAccess');
      return {
        notificationKeys,
        data: []
      }
    }

    response.push({ ...viewAccess, id: result.lastID });
  }

  return {
    notificationKeys,
    data: response
  };
}

async function updateViewAccess(payload) {
  validateCreate(payload);

  const notificationKeys = [];

  for (const viewAccess of payload) {
    const { id, accessLevel} = viewAccess;
    const result = await db.run(
      'UPDATE appModuleViewAccess SET accessLevel = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', 
      [accessLevel, id]
    );

    if (!result.changes) {
      notificationKeys.push(`Error in updating appModuleViewAccess::${id}`);
      return {
        notificationKeys,
        data: []
      }
    }
  }

  return {
    notificationKeys,
    data: payload
  };
}

module.exports = {
  getViewAccess,
  createViewAccess,
  updateViewAccess
}