import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import { schema } from './schema/schema.js'

async function main() {
  const server = express();
  const port = 3000
  
  server.use(
    '/',
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  
  
  server.listen(port, () => {
    console.log(`Server URL: http://localhost:${port}/`);
  })

}

main();