"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.mocks = {
    Query: function () {
        return {
            todos: function () {
                return [
                    { id: 1, name: 'Todo #1', completed: false },
                    { id: 2, name: 'Todo #2', completed: false },
                    { id: 3, name: 'Todo #3', completed: false },
                ];
            },
        };
    },
    Mutation: function () {
        return {
            create_todo: function () {
                console.log('create_todo()');
            }
        };
    }
};
exports.schemaString = "\n        type Todo {\n            id: String!\n            name: String!\n            completed: Boolean\n        }\n\n        input TodoInputType {\n            name: String!\n            completed: Boolean\n        }\n\n        type Query {\n            todo(id: String!): Todo!\n            todos: [Todo!]!\n        }\n\n        type Mutation {\n            update_todo(id: String!, todo: TodoInputType!): Todo\n            create_todo(todo: TodoInputType!): Todo\n        }\n";
exports.schema = graphql_1.buildSchema(exports.schemaString);
