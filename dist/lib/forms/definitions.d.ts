import { JSONSchema6 } from 'json-schema';
type FromMutationOptions = {
    exclude?: string[];
};
type PropertiesConfiguration = {
    properties?: object;
    required?: string[];
};
export declare namespace ApolloFormBuilder {
    const filterProperties: (properties: {
        [k: string]: {
            title: string;
        };
    }, paths: string[], mode?: "exclusive" | "inclusive") => {
        [k: string]: {
            title: string;
        };
    };
    const getMutationConfig: (jsonSchema: JSONSchema6, name: string, options?: FromMutationOptions) => PropertiesConfiguration;
    const getSchema: (jsonSchema: JSONSchema6, properties: object, required?: string[]) => any;
}
export {};
