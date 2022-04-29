
This is a GraphQL and PostgreSQL project on Docker. To run it:

1. After cloning the repository run `docker-compose up --build -d` from the root project folder.

2. Run `docker exec -it graphql-project_db_1 psql graphql_postgresql -U postgres`. This will connect to database inside the Postgres container.

3. 
  - In the psql interface, paste in the table schema in `api/schema/schema.sql` and press enter.

  - Optional: paste in the test data in `api/schema/test-data.sql` and press enter.

4. After this, the project and data can be accessed via the GraphiQL interface on port 8002 (i.e. localhost:8002)