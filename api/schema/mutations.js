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

export const editEntry = async () => {


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

  return response;
}

export const addTaggedEntry = async (entryId, tagId) => {
  const query = "INSERT INTO ENTRIES_TAGS (entryid, tagid) VALUES ($1, $2);";

  const result = await dbQuery(query, entryId, tagId);

  return result;
}

export const addTagsToEntry = async (tagNames, entryId) => {
  tagNames = parseTagNames(tagNames);

  console.log(`TagNames: ${tagNames}`);

  tagNames.forEach(async (tagName) => {
    const tagExists = await tagAlreadyExists(tagName);
    if (tagExists) {
      const tag = await getTagByTagname(tagName);
      addTaggedEntry(entryId, tag.id)
    } else {
      const newTag = await addTag(tagName);
      addTaggedEntry(entryId, newTag.id);
    }
  })


}