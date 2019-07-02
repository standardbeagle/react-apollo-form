import { ApolloClient } from 'apollo-client';
import { JSONSchema6 } from 'json-schema';
import * as React from 'react';
import { UiSchema, WidgetProps } from 'react-jsonschema-form';
import { ApolloFormTheme, ErrorListComponent } from './renderers';
import { ApolloFormConfig, ReactJsonschemaFormError } from './utils';
export declare type ApolloFormProps<T> = {
    data: any;
    title?: string;
    subTitle?: string;
    config: ApolloFormConfig & {
        mutation?: {
            name: T;
        };
    };
    onSave?: (data: object) => void;
    onChange?: (data: object) => void;
    onCancel?: () => void;
    ui?: UiSchema & ApolloFormUi;
    children?: React.SFC<ApolloRenderProps>;
    liveValidate?: boolean;
    transformErrors?: (formName: string) => (errors: ReactJsonschemaFormError[]) => ReactJsonschemaFormError[];
};
export interface ApolloFormState {
    isDirty: boolean;
    isSaved: boolean;
    hasError: boolean;
    schema: JSONSchema6;
    schemaWithConditionals: JSONSchema6;
    data: any;
}
export interface ApolloRenderProps {
    header: () => React.ReactNode;
    form: () => React.ReactNode;
    buttons: () => React.ReactNode;
    saveButton: () => React.ReactNode;
    cancelButton: () => React.ReactNode;
    cancel: () => void;
    save: (args: any) => void;
    isDirty: boolean;
    isSaved: boolean;
    hasError: boolean;
    data: any;
}
export interface ApolloFormConfigureTheme {
    templates?: ApolloFormTheme['templates'];
    widgets?: ApolloFormTheme['widgets'];
    fields?: ApolloFormTheme['fields'];
    renderers?: Partial<ApolloFormTheme['renderers']>;
}
export interface ApolloFormConfigureOptions {
    client: ApolloClient<any>;
    theme?: ApolloFormConfigureTheme;
    jsonSchema: JSONSchema6;
    i18n?: (key: string) => string;
}
export declare type ApolloFormUi = {
    showErrorsList?: boolean;
    showErrorsInline?: boolean;
    errorListComponent?: ErrorListComponent;
};
export declare type ApolloFormComponent<T> = React.ComponentClass<ApolloFormProps<T>> & {
    registerWidget: (name: string, comp: React.SFC<WidgetProps>) => void;
};
export declare function configure<MutationNamesType = {}>(opts: ApolloFormConfigureOptions): ApolloFormComponent<MutationNamesType>;
