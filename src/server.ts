const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "schoolSubjects.proto";
var protoLoader = require("@grpc/proto-loader");

import { PrismaClient } from '@prisma/client'
import { ISchoolSubject } from 'src/interfaces/ISchoolSubject';

const prisma = new PrismaClient()

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
  getAll: async (_:any, callback:any)  => {
    try {
      const subject = await prisma.schoolSubject.findMany(); 
      console.dir(subject)
      callback(null, {subject});
    } catch (error) {}finally {}
  },
  getShow: async (call:any, callback:any) => {
    try {
      const subject = await prisma.schoolSubject.findUnique({
        where: {
          id: Number(call.request.id),
        },
      });
      console.dir(subject)
      callback(null, subject);
    } catch (error) {}finally {}
  },
  insert: async (call:any, callback:any) =>{
    try{
      const data = {name:call.request.name, description:call.request.description} as ISchoolSubject
      const subject = await prisma.schoolSubject.create({ data });
      console.dir(subject)
      callback(null, subject);
    } catch (error) {}finally {}
  },
  update: async (call:any, callback:any) =>{
    try{
      const data = {name:call.request.name, description:call.request.description} as ISchoolSubject
      const subject = await prisma.schoolSubject.update({
        data,
        where: {
          id: Number(call.request.id),
        },
      });
      callback(null, subject);
    } catch (error) {}finally {}
  },
  delete: async (call :any, callback :any) =>{
    try{
      const subject = await prisma.schoolSubject.delete({
        where: {
          id: Number(call.request.id),
        },
      });
      callback(null, subject);
    } catch (error) {}finally {}
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error : Error, port: string) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);

