export interface LinkAPI {
  href: string;
  name: string;
}

export interface LocationAPI {
  id: number;
  name: string;
  area: string;
  address: string;
}

export interface TeacherAPI {
  id: number;
  name: string;
  pos: string;
  dep: string;
  subdep: string;
}

export interface GroupAPI {
  id: string;
  name: string;
  dep: string;
  edform: string;
}

export interface LessonAPI {
  pairnumber: number;
  timestart: number;
  timeend: number;
  edworkkind: string;
  subgroup: string | null;
  dis: string;
  teacher?: TeacherAPI;
  room?: LocationAPI;
  group?: GroupAPI;
  online: boolean;
  links: LinkAPI[];
  withdist: boolean;
}
