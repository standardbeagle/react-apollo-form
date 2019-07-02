import { IntrospectionQuery } from 'graphql';
export declare const extractMutationsNamesFromFile: (filePath: string) => void | string[];
export declare const extractMutationsNamesFromIntrospection: (introspection: IntrospectionQuery) => void | string[];
export declare const generateMutationTypesDef: (mutations: string[]) => string;
