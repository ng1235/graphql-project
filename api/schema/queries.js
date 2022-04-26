import { dbQuery } from './db-query.js';

export const getUsers = async () => {
  const selectUsers = "SELECT * FROM USERS;"
  let response = await dbQuery(selectUsers);
  let allUsers = response.rows;
  return allUsers;
}