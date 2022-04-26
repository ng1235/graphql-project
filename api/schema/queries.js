import { dbQuery } from './db-query.js';

export const getAllUsers = async () => {
  const selectUsers = "SELECT * FROM USERS;"
  let response = await dbQuery(selectUsers);
  let allUsers = response.rows;
  return allUsers;
}

export const getAllEntries = async () => {
  const selectEntries = "SELECT * FROM Entries;"
  let response = await dbQuery(selectEntries);
  let allEntries = response.rows;
  return allEntries;
}

export const getAllTags = async () => {
  const selectTags = "SELECT * FROM TAGS;"
  let response = await dbQuery(selectTags);
  let allTags = response.rows;
  return allTags;
}

export const getUser = async (id) => {
  const getUserQuery = "SELECT * FROM USERS WHERE id = $1;";
  let response = await dbQuery(getUserQuery, id);

  if (response) {
    const user = response.rows[0];
    return user;
  }
}

export const getUserEntries = async (id) => {
  const getUserEntriesQuery = "SELECT * FROM ENTRIES WHERE userid = $1;";

  let response = await dbQuery(getUserEntriesQuery, id);

  if (response) {
    const userEntries = response.rows;
    return userEntries;
  }
}

export const getTag = async (id) => {
  const getTagQuery = "SELECT * FROM TAGS WHERE id = $1;";
  let response = await dbQuery(getTagQuery, id);

  if (response) {
    const tag = response.rows[0];
    return tag;
  }
}

export const getEntryTags = async (entryId) => {
  const tags = [];
  
  const getEntryTagQuery = "SELECT * FROM ENTRIES_TAGS WHERE entryid = $1;";
  
  let response = await dbQuery(getEntryTagQuery, entryId);

  if (response) {
    response.rows.forEach((row) => {
      let tag = getTag(row.tagid);
      tags.push(tag)
    });

    return tags;
  }
}

export const getEntryByEntryId = async (id) => {
  const getEntryQuery = "SELECT * FROM ENTRIES WHERE id = $1;";
  let response = await dbQuery(getEntryQuery, id);

  if (response) {
    const entry = response.rows[0];
    console.log(entry);
    return entry;
  }
}

export const tagAlreadyExists = async (label) => {
  const tagNameQuery = "SELECT * FROM TAGS WHERE LOWER(tagname) = LOWER($1);";

  const response = await dbQuery(tagNameQuery, label);

  return response.rowCount > 0;
}

export const getTagByTagname = async (label) => {
  const tagNameQuery = "SELECT * FROM TAGS WHERE LOWER(tagname) = LOWER($1);";

  const response = await dbQuery(tagNameQuery, label);

  return response.rows[0];
}

export const getEntriesByTagId = async (id) => {
  const entries = [];
  const getEntriesQuery = "SELECT * FROM ENTRIES_TAGS WHERE tagid = $1;";
  let response = await dbQuery(getEntriesQuery, id);

  if (response) {
    response.rows.forEach((row) => {
      
      let entry = getEntry(row.entryid);

      entries.push(entry);
    });

    return entries;
  }
}

