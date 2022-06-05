import { LessonUI } from './LessonUI';

export interface Day {
  name: string;
  date: string;
  lessons: LessonUI[];
}
