import { ISchoolSubject } from 'src/interfaces/ISchoolSubject';
export declare class Subject {
    constructor();
    static isValidReq(data: ISchoolSubject, callback: any): {
        message: string;
        erro: number;
    };
    static all(): Promise<import(".prisma/client").SchoolSubject[]>;
    static show(id: any): Promise<import(".prisma/client").SchoolSubject>;
    static insert(data: ISchoolSubject, callback: any): Promise<any>;
    static update(data: ISchoolSubject, id: any, callback: any): Promise<any>;
    static delete(id: any): Promise<import(".prisma/client").SchoolSubject>;
}
