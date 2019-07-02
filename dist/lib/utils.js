"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.extractMutationsNamesFromFile = function (filePath) {
    var content = fs.readFileSync(filePath);
    if (content) {
        var introspection = JSON.parse(content.toString()).data;
        return exports.extractMutationsNamesFromIntrospection(introspection);
    }
    else {
        throw new Error("Unable to read " + filePath);
    }
};
exports.extractMutationsNamesFromIntrospection = function (introspection) {
    var mutationType = introspection.__schema.mutationType.name;
    var mutations = introspection.__schema.types.find(function (t) { return t.name === mutationType; });
    return mutations ?
        mutations.fields.map(function (f) { return f.name; }) :
        [];
};
exports.generateMutationTypesDef = function (mutations) {
    return ("\n/* this file is generated, do not edit and keep it in tsconfig.rootDir scope! */\n\ndeclare type ApolloFormMutationNames = " + mutations.map(function (m) { return "'" + m + "'"; }).join(' | ') + ";\n");
};
