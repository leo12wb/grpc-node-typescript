"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const subject_service_1 = require("../subject/subject.service");
{
    const params = {
        name: 'ts',
        description: 'lore',
    };
    assert_1.default.rejects(() => subject_service_1.Subject.insert(params, {}), { message: 'name must be higher than 3' }, 'name must be higher than 3');
}
//# sourceMappingURL=server.test.js.map