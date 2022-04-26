import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import { 
  getAllUsers, 
  getUser, 
  getUserEntries,
  getAllEntries,
  getTag,
  getAllTags,
  getEntryByEntryId,
  getEntryTags,
  getEntriesByTagId,
} from './queries.js'

import {
  addEntry,
  deleteEntry,
  addTagsToEntry
} from './mutations.js'


const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user of this application',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    entries: {
      type: new GraphQLList(EntryType),
      resolve: async (user) => {
        const userEntries = await getUserEntries(user.id);
        return userEntries;
      }
    }
  })
})

const EntryType = new GraphQLObjectType({
  name: 'Entry',
  description: "This represents an entry by a user of the application. Each tag is separated by a comma. (i.e. 'Mindset,Philosophy').",
  fields: () => ({
    header: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    userid: { type: new GraphQLNonNull(GraphQLInt) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    tags: {
      type: new GraphQLList(TagType),
      resolve: async (entry) => {
        const entryTags = await getEntryTags(entry.id)
        return entryTags;
      }
    } 
  })
})

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'Represents a tag associated with an entry.',
  fields: () => ({
    tagname: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    entries: {
      type: new GraphQLList(EntryType),
      resolve: async (tag) => {
        const entries = await getEntriesByTagId(tag.id);
        return entries;
      }
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root mutation",
  fields: () => ({
    addEntry: {
      type: EntryType,
      description: 'Add an entry',
      args: {
        userid: { type: new GraphQLNonNull(GraphQLInt) },
        header: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        let { userid, header, content, tags } = args;
        const newEntry = await addEntry(header, content, userid);

        console.log(newEntry)
        await addTagsToEntry(tags, newEntry.id);

        return getEntryByEntryId(newEntry.id);
      }
    },
    editEntry: {
      type: EntryType,
      description: 'Edit an existing entry. Returns the edited entry.',
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        header: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        // TODO
      }
    },
    deleteEntry: {
      type: EntryType,
      description: "Delete an entry. Returns the deleted entry",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => deleteEntry(args.id)
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      description: "A user of this application",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => await getUser(args.id)
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => await getAllUsers()
    },
    entry: {
      type: EntryType,
      description: "A single entry",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => await getEntryByEntryId(args.id)
    },
    entries: {
      type: new GraphQLList(EntryType),
      description: "A collection of entries input by users.",
      resolve: async () => await getAllEntries()
    },
    tag: {
      type: TagType,
      description: "A single tag",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => await getTag(args.id)
    },
    tags: {
      type: new GraphQLList(TagType),
      description: "A collection of all tags.",
      resolve: async () => await getAllTags()
    }
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});