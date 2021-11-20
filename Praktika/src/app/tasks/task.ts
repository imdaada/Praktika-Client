import {User} from './user';

export class Task {
  id: number;
  studentLogin: User;
  teacherLogin: User;
  textOfTask: string;
  taken: boolean;
  answerOnTask: string;
  feedback: string;
}
