import { PrismaClient } from '@prisma/client'
import { ISchoolSubject } from 'src/interfaces/ISchoolSubject';
const prisma = new PrismaClient();
const grpc = require("@grpc/grpc-js");

export class Subject{
  constructor(){}

  static async all(){
    const res = await prisma.schoolSubject.findMany(); 
    return res;
  }

  static async show(id: any){
    const res = await prisma.schoolSubject.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res;
  }

  static async insert(data: ISchoolSubject, callback:any){
    let r = this.#isValidReq(data,callback)
    if(r.erro == 1){
      return callback({
        code: 422,
        message: r.message,
        status: grpc.status.INTERNAL
      })
    }else{
      const res = await prisma.schoolSubject.create({ data });
      return res;
    }
  }

  static async update(data: ISchoolSubject, id: any, callback:any){
    let r = this.#isValidReq(data,callback)
    if(r.erro == 1){
      return callback({
        code: 422,
        message: r.message,
        status: grpc.status.INTERNAL
      })
    }else{
      const res = await prisma.schoolSubject.update({
        data,
        where: {
          id: Number(id),
        },
      });
      return res;
    }
  }

  static async delete(id: any){
    const res = await prisma.schoolSubject.delete({
      where: {
        id: Number(id),
      },
    });
    return res;
  }

  static #isValidReq(data:ISchoolSubject,callback:any){
    if(data.name.length < 3){
      return {message:'name must be higher than 3','erro': 1};
    }
    return {message:'','erro': 0};
  }
}