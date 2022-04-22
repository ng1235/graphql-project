const users = [
  { id: 1, name: 'Matthew' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Francisco' }
];

const entries = [
  { id: 1, header: 'Strengths & Weaknesses', content: "In school, you are graded on every test—even if it's your weakest subject. In life, you can choose the tests you take — even if they always play to your strengths.", userId: 1, tagsId: [1, 2] },
  { id: 2, header: 'Flexibility', content: 'Know what you want. Be flexible about how to get there.', userId: 1, tagsId: [1, 2] },
  { id: 3, header: 'On Mindset', content: "The longer you're in a field, the harder it is to perceive new truths. Your mind is biased toward refining what you're already doing instead of exploring fresh terrain.", userId: 2, tagsId: [1, 2] },
  { id: 4, header: 'Hope', content: 'There are times when dreams sustain us more than facts.', userId: 3, tagsId: [1, 2] },
  { id: 5, header: 'On Startups', content: 'Write code. Talk to users. ', userId: 3, tagsId: [3] },
];

const tags = [
  { id: 1, tagName: 'Philosophy', entryId: [1, 2], userId: [1] },
  { id: 2, tagName: 'Mindset', entryId: [3, 4], userId: [2] },
  { id: 3, tagName: 'Startups', entryId: [5], userId: [3] },
]

export { users, entries, tags };
