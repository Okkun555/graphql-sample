const { ApolloServer, gql } = require("apollo-server");
const { default: axios } = require("axios");

// スキーマの設定
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    myPosts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
  }

  type Query {
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
    posts: [Post]
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
      let response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${args.id}`
      );
      let user = response.data;
      response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const myPosts = response.data.filter((post) => post.userId == args.id);
      user = Object.assign({}, user, {
        myPosts: myPosts,
      });
      return user;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
