
This is a GraphQL and PostgreSQL project on Docker. To run it:

1. After cloning the repository run `docker-compose up --build -d` from the root project folder.

2. Run `docker exec -it graphql-project_db_1 bash` to connect to the database container.

3. Access the database via `psql graphql_postgresql -U postgres`, paste in the table schema in `api/schema/schema.sql` and press enter.

4. Optional: paste in the test data in `api/schema/test-data.sql` and press enter.

5. After this, project and data can be accessed via the GraphiQL interface on port 8002 (i.e. localhost:8002)