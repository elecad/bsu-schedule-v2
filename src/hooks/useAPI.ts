import axios from 'axios';
import { constants } from 'fs';
import { useEffect, useState } from 'react';
import { groupLessonAPI } from '../dto/scheduleAPI';
import { Button } from '../types/Button';
import { CardText } from '../types/CardText';
import { Chip } from '../types/Chip';
import { Course } from '../types/Course';
import { Discipline } from '../types/Discipline';
import { LessonUI } from '../types/LessonUI';
import { Day } from '../types/Day';
import { SCHEDULE_TYPES } from '../enum/scheduleTypes';
import { Schedule } from '../types/Schedule';

const API_LINK: string =
  'https://beluni.ru/schedule/g/12001902?from=2022-05-09&to=2022-05-15&qdist=1';

const useAPI = (type: SCHEDULE_TYPES) => {
  const [lessons, setLessons] = useState<groupLessonAPI[]>([]);

  useEffect(() => {
    loading();
  }, []);

  var days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];

  const modification = (data: groupLessonAPI[]) => {
    let schedule: Schedule = {
      header: 'Группа 12001902',
      days: [],
    };
    let lastDayWeekIndex = -1;
    let temp = new Date();

    const setAndGetTime = (time: number) => {
      temp.setTime(time * 1000);
      return temp.toLocaleTimeString(['ru-RU'], {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const setAndGetDate = (time: number) => {
      temp.setTime(time * 1000);
      return temp.toLocaleString('ru-RU', { month: 'long', day: 'numeric' });
    };

    data.forEach((el, i, arr) => {
      const lesson: LessonUI = {
        chips: [
          ...(el.edworkkind
            ? [{ text: el.edworkkind, color: 'green' } as Chip]
            : []),
          ...(el.subgroup
            ? [{ text: el.subgroup, color: 'green' } as Chip]
            : []),
          ...(el.online ? [{ text: 'онлайн', color: 'green' } as Chip] : []),
        ],
        discipline: {
          number: el.pairnumber,
          startTime: setAndGetTime(el.timestart),
          endTime: setAndGetTime(el.timeend),
          startTs: el.timestart,
          endTs: el.timeend,
          name: el.dis,
          subname: el.withdist ? '(с видеотрансляцией)' : '',
          isDivider:
            i + 1 < arr.length && arr[i].pairnumber != arr[i + 1].pairnumber,
        },
        cardSubHeaders: [
          ...(el.teacher
            ? [
                {
                  icon: 'teacher-icon',
                  text: `${el.teacher.name} (${el.teacher.pos})`,
                } as CardText,
              ]
            : []),
          ...(el.room
            ? [
                {
                  icon: 'location-icon',
                  text: `ауд. ${el.room.name} ${el.room.area}`,
                } as CardText,
              ]
            : []),
        ],
        cardPromts: [
          ...(el.teacher
            ? [
                {
                  icon: 'teacher-promt-icon',
                  text: `${el.teacher.dep} ${el.teacher.subdep}`,
                } as CardText,
              ]
            : []),
          ...(el.room
            ? [
                {
                  icon: 'location-promt-icon',
                  text: el.room.address,
                } as CardText,
              ]
            : []),
        ],
        buttons: [
          {
            icon: 'teacher-button-icon',
            hint: el.teacher ? 'Переход к расписанию преподавателя' : '',
            href: el.teacher ? `t/${el.teacher.id}` : '',
            active: el.teacher != null,
          },
          {
            icon: 'location-button-icon',
            hint: el.room ? 'Переход к расписанию аудитории' : '',
            href: el.room ? `a/${el.teacher.id}` : '',
            active: el.room != null,
          },
        ],
        courses: el.links,
      };

      const dayWeek = temp.getDay();
      if (dayWeek != lastDayWeekIndex) {
        schedule.days.push({
          name: days[dayWeek],
          date: temp.toLocaleString('ru-RU', { month: 'long', day: 'numeric' }),
          lessons: [lesson],
        });
        lastDayWeekIndex = dayWeek;
      } else {
        schedule.days[schedule.days.length - 1].lessons.push(lesson);
      }
    });

    console.log(schedule);
  };

  const loading = async () => {
    try {
      const response = await axios.get<groupLessonAPI[]>(API_LINK);
      modification(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return [lessons, setLessons] as const;
};

export default useAPI;
