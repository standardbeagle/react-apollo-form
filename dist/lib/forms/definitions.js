"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var defaultFromMutationOptions = {
    exclude: ['id']
};
var ApolloFormBuilder;
(function (ApolloFormBuilder) {
    ApolloFormBuilder.filterProperties = function (properties, paths, mode) {
        if (mode === void 0) { mode = 'exclusive'; }
        return mode === 'exclusive' ?
            lodash_1.omit(properties, paths) :
            lodash_1.pick(properties, paths);
    };
    ApolloFormBuilder.getMutationConfig = function (jsonSchema, name, options) {
        if (options === void 0) { options = defaultFromMutationOptions; }
        var mutation = jsonSchema.properties.Mutation.properties[name];
        if (mutation) {
            var args = mutation.properties.arguments;
            if (args) {
                return {
                    properties: ApolloFormBuilder.filterProperties(lodash_1.reduce(args.properties, function (prev, curr, k) {
                        prev[k] = curr;
                        return prev;
                    }, {}), options.exclude, 'exclusive'),
                    required: mutation.required.filter(function (r) { return !(options.exclude || []).includes(r); })
                };
            }
            else {
                console.error("mutation " + name + " has no arguments");
                return {};
            }
        }
        console.error("unknown mutation " + name);
        return {};
    };
    ApolloFormBuilder.getSchema = function (jsonSchema, properties, required) {
        if (required === void 0) { required = []; }
        return {
            type: 'object',
            properties: properties,
            required: required,
            definitions: jsonSchema.definitions || {}
        };
    };
})(ApolloFormBuilder = exports.ApolloFormBuilder || (exports.ApolloFormBuilder = {}));
