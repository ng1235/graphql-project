import pkg from 'pg'
const { Client } = pkg;

const logQuery = (statement, parameters) => {
  let timestamp = new Date();
  let formattedTimestamp = timestamp.toString().substring(4, 24);
  console.log(formattedTimestamp, statement, parameters);
}

export const dbQuery = async (statement, ...parameters) => {
  const client = new Client({ database: "graphql_project" });

  await client.connect();
  logQuery(statement, parameters);
  let result = await client.query(statement, parameters);
  await client.end();

  return result;
}