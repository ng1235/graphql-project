import { dbQuery } from './db-query.js';
import { getAllEntries, getEntryByEntryId, tagAlreadyExists,
  getTagByTagname } from './queries.js'
import { parseTagNames } from './utils.js';

export const addEntry = async (header, content, userId) => {
  const addEntryQuery = "INSERT INTO ENTRIES (header, content, userid) VALUES($1, $2, $3) RETURNING id;";

  const newEntry = await dbQuery(addEntryQuery, header, content, userId);

  let newEntryId = newEntry.rows[0].id;

  const newEntryData = await getEntryByEntryId(newEntryId);

  return newEntryData;
}

export const editEntry = async (header, content, entryid) => {
  const editEntryQuery = "UPDATE ENTRIES SET header = $1, content = $2 WHERE id = $3 RETURNING id";

  const editedEntry = await dbQuery(editEntryQuery, header, content, entryid);

  let editedEntryId = editedEntry.rows[0].id;

  const editedEntryData = await getEntryByEntryId(editedEntryId);

  return editedEntryData
}

export const deleteEntry = async (entryId) => {
  const deleteQuery = "DELETE FROM ENTRIES WHERE id = $1";

  const entry = await getEntryByEntryId(entryId);

  dbQuery(deleteQuery, entryId);

  return entry;
}

export const addTag = async (tagName) => {
  const newTagQuery = "INSERT INTO TAGS (tagname) VALUES ($1) RETURNING id;";

  const response = await dbQuery(newTagQuery, tagName);

  return response.rows[0];
}

const addTaggedEntry = async (entryId, tagId) => {
  const query = "INSERT INTO ENTRIES_TAGS (entryid, tagid) VALUES ($1, $2);";

  const result = await dbQuery(query, entryId, tagId);

  return result;
}

const deleteTaggedEntries = async (entryId) => {
  const query = "DELETE FROM ENTRIES_TAGS WHERE entryid = $1";

  const result = await dbQuery(query, entryId);

  return result;
}

export const addTagsToEntry = async (tagNames, entryId) => {
  tagNames = parseTagNames(tagNames);

  tagNames.forEach(async (tagName) => {
    const tagExists = await tagAlreadyExists(tagName);
    if (tagExists) {
      const tag = await getTagByTagname(tagName);
      addTaggedEntry(entryId, tag.id)
    } else {
      const newTag = await addTag(tagName);
      addTaggedEntry(entryId, newTag.id);
    }
  });
}

export const editEntryTags = async (tagNames, entryId) => {
  deleteTaggedEntries(entryId)
  addTagsToEntry(tagNames, entryId);
}