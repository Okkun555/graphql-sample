const { ApolloServer, gql } = require("apollo-server");
const { default: axios } = require("axios");

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

// リゾルバの設定
const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
    users: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
    user: async (parent, args) => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${args.id}`
      );
      return res.data;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
