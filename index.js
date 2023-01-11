const { ApolloServer, gql } = require("apollo-server");

// スキーマの設定
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
  }
`;

const users = [
  { id: "1", name: "Kana Togo", email: "togo@sample.com" },
  { id: "2", name: "Tom Doe", email: "tom@test.com" },
];

// リゾルバの設定
const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
