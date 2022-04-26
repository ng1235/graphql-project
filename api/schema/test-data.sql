INSERT INTO Users (name) VALUES ('Matthew'), ('John'), ('Francisco');

INSERT INTO Entries (header, content, userId) VALUES
  ('Strengths & Weaknesses', 'In school, you are graded on every test—even if it is your weakest subject. In life, you can choose the tests you take — even if they always play to your strengths.', 1),
  ('Flexibility', 'Know what you want. Be flexible about how to get there.', 2),
  ('On Mindset', 'The longer you are in a field, the harder it is to perceive new truths. Your mind is biased toward refining what you already doing instead of exploring fresh terrain.', 3),
  ('Hope', 'There are times when dreams sustain us more than facts.', 1),
  ('On Startups', 'Write code. Talk to users', 3);

INSERT INTO Tags (tagName) VALUES
  ('Philosophy'),
  ('Mindset'),
  ('Startups');

INSERT INTO Entries_Tags (entryId, tagId) VALUES
  (1, 1),
  (2, 1),
  (2, 2),
  (3, 2),
  (4, 2),
  (5, 3);