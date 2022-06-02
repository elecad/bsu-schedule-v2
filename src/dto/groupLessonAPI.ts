import { Link } from "../types/Links";
import { Location } from "../types/Location";
import { Teacher } from "../types/Teacher";

export interface groupLessonAPI {
  pairnumber: number;
  timestart: number;
  timeend: number;
  edworkkind: string;
  subgroup: string | null;
  dis: string;
  teacher: Teacher;
  room: Location;
  online: boolean;
  links: Link[];
}
