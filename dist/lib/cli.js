#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var codegen = require("apollo-codegen");
var fs = require("fs");
var graphql_2_json_schema_1 = require("graphql-2-json-schema");
var path = require("path");
var yargs = require("yargs");
var utils_1 = require("./utils");
process.on('unhandledRejection', function (error) { throw error; });
process.on('uncaughtException', handleError);
function handleError(error) { console.error(error); process.exit(1); }
yargs
    .command('fetch-mutations <url> <outputPath>', 'Generate typings, and JSON Schema from GraphQL endpoint', {
    outputPath: {
        alias: 'o',
        demand: true,
        describe: 'Output path for generated files',
        default: '.',
        normalize: true,
        coerce: path.resolve,
    },
    header: {
        alias: 'H',
        describe: 'Additional header to send to the server as part of the introspection query request',
        type: 'array',
        coerce: function (arg) {
            var additionalHeaders = {};
            for (var _i = 0, arg_1 = arg; _i < arg_1.length; _i++) {
                var header = arg_1[_i];
                var separator = header.indexOf(':');
                var name_1 = header.substring(0, separator).trim();
                var value = header.substring(separator + 1).trim();
                if (!(name_1 && value)) {
                    throw new Error('Headers should be specified as "Name: Value"');
                }
                additionalHeaders[name_1] = value;
            }
            return additionalHeaders;
        }
    },
    insecure: {
        alias: 'K',
        describe: 'Allows "insecure" SSL connection to the server',
        type: 'boolean'
    },
    method: {
        demand: false,
        describe: 'The HTTP request method to use for the introspection query request',
        type: 'string',
        default: 'POST',
        choices: ['POST', 'GET', 'post', 'get']
    }
}, function (argv) { return __awaiter(_this, void 0, void 0, function () {
    var url, outputPath, header, insecure, method, mutationNames, jsonSchemaObj, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = argv.url, outputPath = argv.outputPath, header = argv.header, insecure = argv.insecure, method = argv.method;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('[1/3] downloadSchema ...');
                return [4, codegen.downloadSchema(url, path.resolve(outputPath, 'schema.json'), header, insecure, method)];
            case 2:
                _a.sent();
                console.log('[2/3] generate mutations enum type ...');
                mutationNames = utils_1.extractMutationsNamesFromFile(path.resolve(outputPath, 'schema.json'));
                if (mutationNames) {
                    fs.writeFileSync(path.resolve(outputPath, 'mutations.d.ts'), utils_1.generateMutationTypesDef(mutationNames));
                }
                else {
                    console.error('Failed to generate mutations typing');
                }
                console.log('[3/3] generate json schema file ...');
                jsonSchemaObj = graphql_2_json_schema_1.fromIntrospectionQuery(JSON.parse(fs.readFileSync(path.resolve(outputPath, 'schema.json')).toString()).data);
                fs.writeFileSync(path.resolve(outputPath, 'apollo-form-json-schema.json'), JSON.stringify(jsonSchemaObj));
                return [3, 4];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3, 4];
            case 4:
                console.log('Done.');
                return [2];
        }
    });
}); })
    .fail(function (message, error) {
    handleError(message);
})
    .help()
    .version()
    .strict()
    .argv;
