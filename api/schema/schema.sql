CREATE TABLE Users (
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE Entries (
  id serial PRIMARY KEY,
  userId int NOT NULL,
  header text NOT NULL,
  content text NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Tags (
  id serial PRIMARY KEY,
  tagName text NOT NULL
);

CREATE TABLE Entries_Tags (
  id serial PRIMARY KEY,
  entryId integer NOT NULL,
  tagId integer NOT NULL, 
  FOREIGN KEY (entryId) REFERENCES Entries(id) ON DELETE CASCADE,
  FOREIGN KEY (tagId) REFERENCES Tags(id) ON DELETE CASCADE
);



