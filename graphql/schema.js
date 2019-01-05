const graphql = require("graphql"),
  Philosopher = require("../models/philosopher"),
  Work = require("../models/Work");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const PhilosopherType = new GraphQLObjectType({
  name: "Philosopher",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    school: { type: GraphQLString },
    works: {
      type: new GraphQLList(WorkType),
      resolve(source) {
        return Work.find({ authorID: source.id });
      }
    }
  })
});

const WorkType = new GraphQLObjectType({
  name: "Work",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    desc: { type: GraphQLString },
    category: { type: GraphQLString },
    author: {
      type: new GraphQLList(PhilosopherType),
      resolve(source) {
        return Philosopher.find({ _id: source.authorID });
      }
    }
  })
});

const QueryRoot = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    philosopher: {
      type: PhilosopherType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Philosopher.findById(args.id);
      }
    },
    philosophers: {
      type: new GraphQLList(PhilosopherType),
      resolve() {
        return Philosopher.find({});
      }
    },
    work: {
      type: WorkType,
      args: { id: { type: GraphQLID } },
      resolve(source, args) {
        return Work.findById(args.id);
      }
    },
    works: {
      type: new GraphQLList(WorkType),
      resolve() {
        return Work.find({});
      }
    }
  }
});

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPhilosopher: {
      type: PhilosopherType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        school: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(source, args) {
        return new Philosopher({
          name: args.name,
          school: args.school
        }).save();
      }
    },
    addWork: {
      type: WorkType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        desc: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        authorID: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(source, args) {
        return new Work({
          title: args.title,
          desc: args.desc,
          category: args.category,
          authorID: args.authorID
        }).save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot
});
