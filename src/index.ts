import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import path from 'path';

const typeDefs = loadSchemaSync(
  [
    path.join(process.cwd(), 'schemas'),
  ],
  {
    loaders: [new GraphQLFileLoader()],
  },
);

const resolverFiles = loadFilesSync(path.join(process.cwd(),'src', 'resolvers'));
const resolvers = mergeResolvers(resolverFiles);


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests

async function main() {
  const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
return url
}


main().then(url => console.log("app is running at: ", url))
