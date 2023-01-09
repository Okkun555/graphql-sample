const { ApolloServer, gql } = require("apollo-server");

// スキーマの設定
const typeDefs = gql`
  type Query {
    hello(name: String!): String
  }
`;

// リゾルバの設定
const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
