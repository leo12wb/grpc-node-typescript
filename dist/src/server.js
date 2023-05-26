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
const subject_service_1 = require("./subject/subject.service");
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
        try {
            const subject = yield subject_service_1.Subject.all();
            console.dir(subject);
            callback(null, { subject });
        }
        catch (error) { }
        finally { }
    }),
    getShow: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const subject = yield subject_service_1.Subject.show(call.request.id);
            console.dir(subject);
            callback(null, subject);
        }
        catch (error) { }
        finally { }
    }),
    insert: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = { name: call.request.name, description: call.request.description };
            const subject = yield subject_service_1.Subject.insert(data, callback);
            console.dir(subject);
            callback(null, subject);
        }
        catch (error) { }
        finally { }
    }),
    update: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = { name: call.request.name, description: call.request.description };
            const subject = yield subject_service_1.Subject.update(data, call.request.id, callback);
            callback(null, subject);
        }
        catch (error) { }
        finally { }
    }),
    delete: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const subject = subject_service_1.Subject.delete(call.request.id);
            callback(null, subject);
        }
        catch (error) { }
        finally { }
    }),
});
server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
});
//# sourceMappingURL=server.js.map