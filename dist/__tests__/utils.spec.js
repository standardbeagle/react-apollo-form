"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
describe('utils', function () {
    test('extractMutationsNamesFromIntrospection()', function () {
        var introspection = require('./mocks/todo-introspection.json');
        var mutations = utils_1.extractMutationsNamesFromIntrospection(introspection);
        expect(mutations).toEqual([
            'update_todo',
            'create_todo',
        ]);
    });
});
