import { Classe } from "./class.model";
import { classroom } from "./classroom.module";
import { Professor } from "./professor.model";

export interface Event {
    id: number;
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    professor:Professor;
    classe:Classe;
    classroom:classroom;
    
  }