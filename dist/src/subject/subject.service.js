"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const grpc = require("@grpc/grpc-js");
class Subject {
    constructor() { }
    static isValidReq(data, callback) {
        if (data.name.length < 3) {
            console.dir('name must be higher than 3');
            return { message: 'name must be higher than 3', 'erro': 1 };
        }
        return { message: '', 'erro': 0 };
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield prisma.schoolSubject.findMany();
            return res;
        });
    }
    static show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield prisma.schoolSubject.findUnique({
                where: {
                    id: Number(id),
                },
            });
            return res;
        });
    }
    static insert(data, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = this.isValidReq(data, callback);
            if (r.erro == 1) {
                return callback({
                    code: 422,
                    message: r.message,
                    status: grpc.status.INTERNAL
                });
            }
            else {
                const res = yield prisma.schoolSubject.create({ data });
                return res;
            }
        });
    }
    static update(data, id, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = this.isValidReq(data, callback);
            if (r.erro == 1) {
                return callback({
                    code: 422,
                    message: r.message,
                    status: grpc.status.INTERNAL
                });
            }
            else {
                const res = yield prisma.schoolSubject.update({
                    data,
                    where: {
                        id: Number(id),
                    },
                });
                return res;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield prisma.schoolSubject.delete({
                where: {
                    id: Number(id),
                },
            });
            return res;
        });
    }
}
exports.Subject = Subject;
//# sourceMappingURL=subject.service.js.map