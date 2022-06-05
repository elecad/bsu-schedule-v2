import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardText } from '../types/CardText';
import { Chip } from '../types/Chip';
import { LessonUI } from '../types/LessonUI';
import { SCHEDULE_TYPES } from '../enum/scheduleTypes';
import { Schedule } from '../types/Schedule';

import {
  getDay,
  getScheduleDate,
  getScheduleTime,
  getWeekDay,
} from '../utils/dateFunction';
import { Discipline } from '../types/Discipline';
import { Button } from '../types/Button';
import { LessonAPI } from '../dto/scheduleAPI';
import { Day } from '../types/Day';

const API_TEACHER_LINK: string =
  'https://beluni.ru/schedule/t/179475?from=2022-05-09&to=2022-05-15&qdist=1';

const API_GROUP_LINK: string =
  'https://beluni.ru/schedule/g/12001902?from=2022-05-09&to=2022-05-15&qdist=1';

const API_LOCATION_LINK: string =
  'https://beluni.ru/schedule/a/9605?from=2022-05-09&to=2022-05-15&qdist=1';
const useAPI = (type: SCHEDULE_TYPES, header: string) => {
  const [lessons, setLessons] = useState<Schedule>({
    header,
    days: [],
  });

  useEffect(() => {
    loading();
  }, []);

  const toLessonUI = (el: LessonAPI, isDivider: boolean): LessonUI => {
    const chips: Chip[] = [];

    if (el.edworkkind) chips.push({ text: el.edworkkind, color: 'green' });
    if (el.subgroup) chips.push({ text: el.subgroup, color: 'green' });
    if (el.online) chips.push({ text: 'онлайн', color: 'green' });

    const discipline: Discipline = {
      number: el.pairnumber,
      startTime: getScheduleTime(el.timestart),
      endTime: getScheduleTime(el.timeend),
      startTs: el.timestart,
      endTs: el.timeend,
      name: el.dis,
      subname: el.withdist ? '(с видеотрансляцией)' : '',
      isDivider,
    };

    const cardSubHeaders: CardText[] = [];
    const cardPromts: CardText[] = [];
    const buttons: Button[] = [];

    if (el.teacher) {
      cardSubHeaders.push({
        icon: 'teacher-icon',
        text: `${el.teacher.name} (${el.teacher.pos})`,
      });
      cardPromts.push({
        icon: 'teacher-promt-icon',
        text: `${el.teacher.dep} ${el.teacher.subdep}`,
      });
      buttons.push({
        icon: 'teacher-button-icon',
        hint: el.teacher ? 'Переход к расписанию преподавателя' : '',
        href: `t/${el.teacher.id}`,
        active: true,
      });
    } else if (el.teacher === null) {
      buttons.push({
        icon: 'teacher-button-icon',
        hint: '',
        href: '',
        active: false,
      });
    }

    if (el.room) {
      cardSubHeaders.push({
        icon: 'location-icon',
        text: `ауд. ${el.room.name} ${el.room.area}`,
      });
      cardPromts.push({
        icon: 'location-promt-icon',
        text: el.room.address,
      });
      buttons.push({
        icon: 'location-button-icon',
        hint: el.room ? 'Переход к расписанию аудитории' : '',
        href: el.room ? `a/${el.room.id}` : '',
        active: el.room != null,
      });
    } else if (el.room === null) {
      buttons.push({
        icon: 'room-button-icon',
        hint: '',
        href: '',
        active: false,
      });
    }

    if (el.group) {
      cardSubHeaders.push({
        icon: 'group-icon',
        text: el.group.name,
      });
      cardPromts.push({
        icon: 'group-promt-icon',
        text: `${el.group.dep} (${el.group.edform} форма обучения)`,
      });
      buttons.push({
        icon: 'group-button-icon',
        hint: el.group ? 'Переход к расписанию группы' : '',
        href: el.group ? `g/${el.group.id}` : '',
        active: el.group != null,
      });
    } else if (el.group === null) {
      buttons.push({
        icon: 'group-button-icon',
        hint: '',
        href: '',
        active: false,
      });
    }

    return {
      chips,
      discipline,
      cardSubHeaders,
      cardPromts,
      buttons,
      courses: el.links,
    };
  };

  const modification = (data: LessonAPI[]) => {
    let days: Day[] = [];
    let lastDayWeekIndex = -1;

    data.forEach((el, i, arr) => {
      const lesson: LessonUI = toLessonUI(
        el,
        i + 1 < arr.length && arr[i].pairnumber != arr[i + 1].pairnumber
      );
      const dayWeek = getDay(el.timestart);
      if (dayWeek != lastDayWeekIndex) {
        days.push({
          name: getWeekDay(dayWeek),
          date: getScheduleDate(el.timestart),
          lessons: [lesson],
        });
        lastDayWeekIndex = dayWeek;
      } else {
        days[days.length - 1].lessons.push(lesson);
      }
    });
    setLessons({ ...lessons, days });
  };

  const loading = async () => {
    try {
      const response = await axios.get<LessonAPI[]>(API_LOCATION_LINK);
      modification(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return [lessons, setLessons] as const;
};

export default useAPI;
