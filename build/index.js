"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
const load_1 = require("@graphql-tools/load");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const path_1 = __importDefault(require("path"));
const typeDefs = (0, load_1.loadSchemaSync)([
    path_1.default.join(process.cwd(), 'schemas'),
], {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
const resolverFiles = (0, load_files_1.loadFilesSync)(path_1.default.join(process.cwd(), 'src', 'resolvers'));
const resolvers = (0, merge_1.mergeResolvers)(resolverFiles);
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, { listen: { port: 4000 } });
        return url;
    });
}
main().then(url => console.log("app is running at: ", url));
