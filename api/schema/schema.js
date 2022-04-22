import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} from 'graphql';
import { users, entries, tags } from './test-data.js'
import { getTagIds } from '../../utils/getTagId.js'

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user of this application',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    entries: {
      type: new GraphQLList(EntryType),
      resolve: (user) => {
        return entries.filter(entry => entry.userId === user.id);
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
    userId: { type: new GraphQLNonNull(GraphQLInt) },
    tags: {
      type: new GraphQLList(TagType),
      resolve: (entry) => {
        return tags.filter((tag) => tag.entryId.includes(entry.id));
      }
    } 
  })
})

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'Represents a tag associated with an entry.',
  fields: () => ({
    tagName: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { 
      type: new GraphQLList(UserType),
      resolve: (tag) => {
        return users.filter((user) => tag.userId.includes(user.id))
      }
    },
    entries: {
      type: new GraphQLList(EntryType),
      resolve: (tag) => {
        return entries.filter((entry) => entry.tagsId.includes(tag.id));
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
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        header: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: GraphQLString }
      },
      resolve: (parent, args) => {
        const { userId, header, content, tags } = args
        const entryId = entries.length + 1 
        const entry = {
          id: entryId,
          header, 
          content, 
          tagsId: getTagIds(tags, userId, entryId),
          userId
        }
        entries.push(entry);
        return entry;
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
        const { id, header, content, tags } = args 
        const index = entries.findIndex((entry) => entry.id === id)
        const updatedEntry = { 
          id,
          header,
          content,
          tags,
          userId: entries[index].id
        }
        entries[index] = updatedEntry;
        return updatedEntry
      }
    },
    deleteEntry: {
      type: EntryType,
      description: "Delete an entry. Returns the deleted entry",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        let entry = entries.find((entry) => entry.id === args.id);
        entries.filter((entry) => entry.id !== args.id)
        return entry;
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        const isoString = new Date().toISOString();
        return isoString.slice(11, 19);
      },
    },
    user: {
      type: UserType,
      description: "A user of this application",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => users.find(user => user.id === args.id)
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users
    },
    entry: {
      type: EntryType,
      description: "A single entry",
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => entries.find((entry) => entry.id === args.id)
    },
    entries: {
      type: new GraphQLList(EntryType),
      description: "A collection of entries input by users.",
      resolve: () => entries
    },
    tag: {
      type: TagType,
      description: "A single tag",
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => tags.find(tag => tag.id === args.id)
    },
    tags: {
      type: new GraphQLList(TagType),
      description: "A collection of all tags.",
      resolve: () => tags
    }
  },
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});