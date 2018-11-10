import { Photo } from './photo';

export interface User {
    id: string;
    userName: string;
    age: number;
    gender: string;
    created: Date;
    work: string;
    infos?: string;
    lastAktive: Date;
    photos?: Photo[];
    photoUrl: string;
    dateOfBirth?: Date;
}
