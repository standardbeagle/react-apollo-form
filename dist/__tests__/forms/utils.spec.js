"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functional_json_schema_1 = require("functional-json-schema");
var lodash_1 = require("lodash");
var utils_1 = require("../../lib/forms/utils");
describe('forms/utils', function () {
    describe('isMutationConfig()', function () {
        test('with ApolloFormConfigManual', function () {
            var config = {
                schema: {},
                saveData: function () { return ({}); }
            };
            expect(utils_1.isMutationConfig(config)).toBe(false);
        });
        test('with ApolloFormConfigMutation', function () {
            var config = {
                mutation: {
                    name: 'my_mutation',
                    document: null
                }
            };
            expect(utils_1.isMutationConfig(config)).toBe(true);
        });
    });
    describe('flattenSchemaProperties()', function () {
        test('should expand definitions', function () {
            var todoSchema = require('../mocks/todo-json-schema.json');
            var mySchema = {
                '$schema': 'http://json-schema.org/draft-06/schema#',
                properties: {
                    a: { '$ref': '#/definitions/Todo' }
                },
                definitions: todoSchema.definitions
            };
            expect(utils_1.flattenSchemaProperties(mySchema)).toEqual({
                a: {
                    type: 'object',
                    properties: {
                        completed: { type: 'boolean' },
                        id: { type: 'string' },
                        name: { type: 'string' }
                    }, required: ['id', 'name']
                }
            });
        });
        test('should expand definitions for 2 levels properties', function () {
            var todoSchema = require('../mocks/todo-json-schema.json');
            var mySchema = {
                '$schema': 'http://json-schema.org/draft-06/schema#',
                properties: {
                    a: {
                        type: 'object',
                        properties: {
                            b: { '$ref': '#/definitions/Todo' }
                        }
                    }
                },
                definitions: todoSchema.definitions
            };
            expect(utils_1.flattenSchemaProperties(mySchema)).toEqual({
                a: {
                    type: 'object',
                    properties: {
                        b: {
                            type: 'object',
                            properties: {
                                completed: { type: 'boolean' },
                                id: { type: 'string' },
                                name: { type: 'string' }
                            }, required: ['id', 'name']
                        }
                    }
                }
            });
        });
    });
    describe('applyConditionsToSchema()', function () {
        test('should update schema following "ui:if"', function () {
            var jsonSchema = functional_json_schema_1.schema({
                form: {
                    referAFriend: functional_json_schema_1.types.type('boolean'),
                    friendName: functional_json_schema_1.types.type('string')
                }
            });
            var uiSchema = {
                form: {
                    friendName: {
                        'ui:if': {
                            'form.referAFriend': true
                        }
                    }
                }
            };
            var data = {
                form: {
                    referAFriend: false
                }
            };
            expect(utils_1.applyConditionsToSchema(jsonSchema, uiSchema, data).properties).toEqual(lodash_1.merge(functional_json_schema_1.schema({
                form: {
                    referAFriend: functional_json_schema_1.types.type('boolean'),
                }
            }).properties, { form: { properties: { friendName: {} } } }));
        });
    });
    describe('cleanData()', function () {
        test('should remove extraneous properties', function () {
            var jsonSchema = functional_json_schema_1.schema({
                form: {
                    referAFriend: functional_json_schema_1.types.type('boolean'),
                    friendName: functional_json_schema_1.types.type('string')
                }
            });
            var data = {
                form: {
                    a: 1,
                    referAFriend: false,
                    b: {
                        c: 1
                    }
                }
            };
            expect(utils_1.cleanData(data, jsonSchema.properties)).toEqual({
                form: {
                    referAFriend: false,
                }
            });
        });
    });
    describe('getSchemaFromConfig()', function () {
        describe('for ApolloFormConfigManual', function () {
            var jsonSchema = functional_json_schema_1.schema({
                form: {
                    referAFriend: functional_json_schema_1.types.type('boolean'),
                    friendName: functional_json_schema_1.types.type('string')
                }
            });
            var config = {
                schema: jsonSchema,
                saveData: function () { return ({}); }
            };
            expect(utils_1.getSchemaFromConfig({}, config)).toEqual({
                type: 'object',
                definitions: {},
                properties: jsonSchema.properties,
                required: []
            });
        });
        describe('for ApolloFormConfigMutation', function () {
            var todoSchema = require('../mocks/todo-json-schema.json');
            var config = {
                mutation: {
                    name: 'create_todo',
                    document: null
                }
            };
            expect(utils_1.getSchemaFromConfig(todoSchema, config)).toEqual({
                type: 'object',
                definitions: todoSchema.definitions,
                properties: functional_json_schema_1.schema({
                    todo: {
                        name: functional_json_schema_1.types.type('string', { required: true }),
                        completed: functional_json_schema_1.types.type('boolean')
                    }
                }).properties,
                required: []
            });
        });
        describe('for ApolloFormConfigMutation / ignoring optional field', function () {
            var todoSchema = require('../mocks/todo-json-schema.json');
            var config = {
                mutation: {
                    name: 'create_todo',
                    document: null
                },
                ignoreFields: ['todo.completed']
            };
            expect(utils_1.getSchemaFromConfig(todoSchema, config)).toEqual({
                type: 'object',
                definitions: todoSchema.definitions,
                properties: functional_json_schema_1.schema({
                    todo: {
                        name: functional_json_schema_1.types.type('string', { required: true })
                    }
                }).properties,
                required: []
            });
        });
        describe('for ApolloFormConfigMutation / ignoring optional field', function () {
            var todoSchema = require('../mocks/todo-json-schema.json');
            var config = {
                mutation: {
                    name: 'create_todo',
                    document: null
                },
                ignoreFields: ['todo.name']
            };
            expect(utils_1.getSchemaFromConfig(todoSchema, config)).toEqual({
                type: 'object',
                definitions: todoSchema.definitions,
                properties: functional_json_schema_1.schema({
                    todo: {
                        completed: functional_json_schema_1.types.type('boolean')
                    }
                }).properties,
                required: []
            });
        });
    });
});
