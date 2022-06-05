import { Button } from "./Button";
import { CardText } from "./CardText";
import { Chip } from "./Chip";
import { Course } from "./Course";
import { Discipline } from "./Discipline";

export interface LessonUI {
  chips: Chip[];
  discipline: Discipline;
  cardSubHeaders: CardText[];
  cardPromts: CardText[];
  buttons: Button[];
  courses: Course[];
}
