import { GraphQLSchema } from 'graphql';
export declare const mocks: {
    Query: () => {
        todos: () => {
            id: number;
            name: string;
            completed: boolean;
        }[];
    };
    Mutation: () => {
        create_todo: () => void;
    };
};
export declare const schemaString = "\n        type Todo {\n            id: String!\n            name: String!\n            completed: Boolean\n        }\n\n        input TodoInputType {\n            name: String!\n            completed: Boolean\n        }\n\n        type Query {\n            todo(id: String!): Todo!\n            todos: [Todo!]!\n        }\n\n        type Mutation {\n            update_todo(id: String!, todo: TodoInputType!): Todo\n            create_todo(todo: TodoInputType!): Todo\n        }\n";
export declare const schema: GraphQLSchema;
