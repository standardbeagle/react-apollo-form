"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var utils_1 = require("react-jsonschema-form/lib/utils");
var definitions_1 = require("./definitions");
exports.isMutationConfig = function (config) {
    return !!lodash_1.get(config, 'mutation') && !!lodash_1.get(config, 'mutation.name');
};
exports.flattenSchemaProperties = function (entrySchema) {
    var reducer = function (schema, definitions) {
        return lodash_1.transform(schema.properties, function (result, value, key) {
            if (lodash_1.get(value, '$ref')) {
                result[key] = lodash_1.cloneDeep(utils_1.retrieveSchema(value, definitions));
            }
            else {
                result[key] = lodash_1.has(value, 'properties') ? __assign({}, value, { properties: reducer(value, definitions) }) : value;
            }
            return result;
        }, {});
    };
    return reducer(entrySchema, entrySchema.definitions || {});
};
var applyConditionsReducer = function (ui, data) {
    return function (acc, curr, key) {
        var _a;
        var propUi = lodash_1.get(ui, key);
        var prop = lodash_1.last(key.split('.'));
        if (propUi && propUi['ui:if']) {
            if (lodash_1.filter(propUi['ui:if'], function (predicate, k) {
                var value = lodash_1.get(data, k);
                return predicate !== value;
            }).length === 0) {
                Object.assign(acc, curr);
            }
        }
        else if (lodash_1.has(curr, 'properties')) {
            Object.assign(acc, (_a = {},
                _a[prop] = __assign({ type: 'object', properties: {} }, (curr.required ? { required: curr.required } : {})),
                _a));
            lodash_1.map(curr.properties, function (v, k) {
                acc[prop].properties[k] =
                    applyConditionsReducer(ui, data)({}, v, key + "." + k);
            });
        }
        else {
            Object.assign(acc, curr);
        }
        return acc;
    };
};
exports.applyConditionsToSchema = function (jsonSchema, ui, data) {
    var schema = lodash_1.cloneDeep(jsonSchema);
    return schema.properties ?
        Object.assign({}, schema, {
            properties: lodash_1.transform(schema.properties, applyConditionsReducer(ui, data), {})
        }) :
        schema;
};
exports.getSchemaFromConfig = function (jsonSchema, config, title) {
    var schema;
    if (!exports.isMutationConfig(config)) {
        schema = definitions_1.ApolloFormBuilder.getSchema(jsonSchema, config.schema.properties || {});
    }
    else {
        var mutationConfig = definitions_1.ApolloFormBuilder.getMutationConfig(jsonSchema, config.mutation.name);
        schema = definitions_1.ApolloFormBuilder.getSchema(jsonSchema, mutationConfig.properties, mutationConfig.required);
    }
    var flattenSchema = lodash_1.cloneDeep(Object.assign({}, schema, { properties: exports.flattenSchemaProperties(schema) }));
    if (config.ignoreFields) {
        config.ignoreFields.map(function (f) {
            lodash_1.unset(flattenSchema.properties, f.replace(/\./g, '.properties.'));
            var pathParts = f.split('.');
            var prop = pathParts.pop();
            var parentPath = pathParts.join('.properties.');
            var parentRequired = lodash_1.get(flattenSchema.properties, parentPath + ".required");
            if (parentRequired.includes(prop)) {
                lodash_1.set(flattenSchema.properties, parentPath + ".required", lodash_1.filter(parentRequired, function (v) { return v !== prop; }));
            }
        });
    }
    if (config.updateFields) {
        lodash_1.map(config.updateFields, function (fieldDef, fieldName) {
            var name = fieldName.replace(/\./g, '.properties.');
            lodash_1.set(flattenSchema.properties, name, lodash_1.merge(lodash_1.get(flattenSchema.properties, name), fieldDef));
        });
    }
    if (config.requiredFields) {
        lodash_1.map(config.requiredFields, function (fieldName) {
            var parts = fieldName.split('.');
            var prop = lodash_1.last(parts);
            var parentsPaths = lodash_1.take(parts, parts.length - 1);
            var name = parentsPaths.join('.').replace(/\./g, '.properties.');
            var newRequired = lodash_1.uniq(lodash_1.get(flattenSchema.properties, name + ".required").concat([prop]));
            lodash_1.set(flattenSchema.properties, name + ".required", newRequired);
        });
    }
    if (config.augment) {
        flattenSchema = lodash_1.merge({}, flattenSchema, config.augment);
    }
    return flattenSchema;
};
exports.cleanData = function (formData, properties, parentPath) {
    if (parentPath === void 0) { parentPath = null; }
    return lodash_1.transform(formData, function (acc, curr, key) {
        var currentPath = parentPath ? parentPath + "." + key : key;
        if (lodash_1.has(properties, currentPath.replace(/\./g, '.properties.'))) {
            if (lodash_1.isPlainObject(curr)) {
                acc[key] = exports.cleanData(curr, properties, currentPath);
            }
            else {
                acc[key] = curr;
            }
        }
        return acc;
    }, {});
};
exports.isTruthyWithDefault = function (value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = true; }
    return lodash_1.isUndefined(value) ? defaultValue : !!value;
};
