import { PureQueryOptions } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { JSONSchema6 } from 'json-schema';
import { RefetchQueriesProviderFn } from 'react-apollo';
import { UiSchema } from 'react-jsonschema-form';
import { ApolloFormUi } from './component';
export declare type ApolloFormConfigBase = {
    name?: string;
    ignoreFields?: string[];
    requiredFields?: string[];
    updateFields?: {
        [k: string]: object;
    };
    augment?: object;
};
export interface ApolloFormConfigMutation extends ApolloFormConfigBase {
    mutation: {
        name: string;
        document: DocumentNode;
        variables?: object;
        context?: object;
        refetchQueries?: string[] | PureQueryOptions[] | RefetchQueriesProviderFn;
    };
}
export interface ApolloFormConfigManual extends ApolloFormConfigBase {
    schema: JSONSchema6;
    saveData: (formData: any) => any;
}
export declare type ApolloFormConfig = ApolloFormConfigManual | ApolloFormConfigMutation;
export declare const isMutationConfig: (config: ApolloFormConfig) => config is ApolloFormConfigMutation;
export declare const flattenSchemaProperties: (entrySchema: any) => any;
export declare const applyConditionsToSchema: (jsonSchema: JSONSchema6, ui: UiSchema & ApolloFormUi, data: object) => JSONSchema6;
export declare const getSchemaFromConfig: (jsonSchema: JSONSchema6, config: ApolloFormConfig, title?: string) => JSONSchema6;
export declare type ReactJsonschemaFormError = {
    message: string;
    name: string;
    params: object;
    property: string;
    stack: string;
};
export declare const cleanData: (formData: object, properties: object, parentPath?: string) => object;
export declare const isTruthyWithDefault: (value: boolean, defaultValue?: boolean) => boolean;
