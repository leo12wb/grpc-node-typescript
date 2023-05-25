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
const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "schoolSubjects.proto";
var protoLoader = require("@grpc/proto-loader");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const proto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();
server.addService(proto.SchoolSubjectService.service, {
    getAll: (_, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const subject = yield prisma.schoolSubject.findMany();
        console.dir(subject);
        callback(null, { subject });
    }),
    getShow: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const subject = yield prisma.schoolSubject.findUnique({
            where: {
                id: Number(call.request.id),
            },
        });
        console.dir(subject);
        callback(null, subject);
    }),
    insert: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: call.request.name, description: call.request.description };
        const subject = yield prisma.schoolSubject.create({ data });
        console.dir(subject);
        callback(null, subject);
    }),
    update: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: call.request.name, description: call.request.description };
        const subject = yield prisma.schoolSubject.update({
            data,
            where: {
                id: Number(call.request.id),
            },
        });
        callback(null, subject);
    }),
    delete: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const subject = yield prisma.schoolSubject.delete({
            where: {
                id: Number(call.request.id),
            },
        });
        callback(null, subject);
    }),
});
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
});
//# sourceMappingURL=server.js.map