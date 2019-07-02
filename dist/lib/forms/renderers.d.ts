import { JSONSchema6 } from 'json-schema';
import * as React from 'react';
import { ArrayFieldTemplateProps, FieldTemplateProps, ObjectFieldTemplateProps, UiSchema } from 'react-jsonschema-form';
import { ApolloFormConfigureTheme, ApolloFormUi } from './component';
import { ApolloFormConfig, ReactJsonschemaFormError } from './utils';
export declare type ErrorListComponent = React.SFC<{
    errors: ReactJsonschemaFormError[];
    errorSchema: object;
    schema: object;
    uiSchema: UiSchema;
    formContext: object;
}>;
export interface ApolloFormTheme {
    templates: {
        FieldTemplate?: React.StatelessComponent<FieldTemplateProps>;
        ArrayFieldTemplate?: React.StatelessComponent<ArrayFieldTemplateProps>;
        ObjectFieldTemplate?: React.StatelessComponent<ObjectFieldTemplateProps>;
    };
    widgets: {
        [k: string]: any;
    };
    fields: {
        [k: string]: any;
    };
    renderers: {
        header: React.SFC<TitleRendererProps>;
        buttons: React.SFC<ButtonsRendererProps>;
        saveButton: React.SFC<SaveButtonRendererProps>;
        cancelButton: React.SFC<CancelButtonRendererProps>;
    };
}
export declare const getTheme: (theme?: ApolloFormConfigureTheme) => ApolloFormTheme;
export interface TitleRendererProps {
    title: string;
}
export declare const titleRenderer: ({ title }: TitleRendererProps) => JSX.Element;
export interface SaveButtonRendererProps {
    save?: () => void;
    isSaved: boolean;
    hasError: boolean;
    isDirty: boolean;
}
export declare const saveButtonRenderer: (props: SaveButtonRendererProps) => JSX.Element;
export interface CancelButtonRendererProps {
    cancel?: () => void;
}
export declare const cancelButtonRenderer: (props: CancelButtonRendererProps) => JSX.Element;
export interface ButtonsRendererProps {
    cancel?: () => void;
    save?: () => void;
    saveButtonRenderer: React.SFC<SaveButtonRendererProps>;
    cancelButtonRenderer: React.SFC<CancelButtonRendererProps>;
    isSaved: boolean;
    hasError: boolean;
    isDirty: boolean;
}
export declare const buttonsRenderer: (props: ButtonsRendererProps) => JSX.Element;
export interface FormRendererProps {
    theme: ApolloFormTheme;
    onChange: (data: any) => void;
    save: (data: any) => void;
    config: ApolloFormConfig;
    schema: JSONSchema6;
    data: object;
    isDirty: boolean;
    ui?: UiSchema & ApolloFormUi;
    subTitle?: string;
    liveValidate?: boolean;
    transformErrors?: any;
}
export interface FormContext {
    subTitle?: string;
    isDirty: boolean;
    showErrorsInline: boolean;
    formPrefix: string;
}
export declare class FormRenderer extends React.Component<FormRendererProps> {
    render(): JSX.Element;
}
