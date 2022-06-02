import axios from "axios";
import { useEffect, useState } from "react";
import { groupLessonAPI } from "../dto/groupLessonAPI";
import { Link } from "../types/Links";
import { Location } from "../types/Location";
import { Teacher } from "../types/Teacher";

interface Lesson {
  number: number;
  startTime: string;
  endTime: string;
  subgroup: string | null;
  name: string;
  teacher: Teacher;
  location: Location;
  online: boolean;
  links: Link[];
}

interface Schedule {
  name: string;
  date: string;
  lessons: Lesson[];
}

const API_LINK: string =
  "https://beluni.ru/schedule/g/12001902?from=2022-05-09&to=2022-05-15";

const useAPI = () => {
  const [lessons, setLessons] = useState<groupLessonAPI[]>([]);

  useEffect(() => {
    loading();
  }, []);

  var days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const modification = (data: groupLessonAPI[]) => {
    let lastDayWeekIndex = -1;

    let schedule: Schedule[] = [];
    let temp = new Date();

    const setTime = (time: number) => {
      temp.setTime(time * 1000);
      return temp;
    };

    data.forEach((el) => {
      setTime(el.timestart);
      console.log(el);
      const dayWeek = [6, 0, 1, 2, 3, 4, 5][temp.getDay()];
      if (dayWeek != lastDayWeekIndex) {
        schedule.push({
          name: days[dayWeek],
          date: temp.toLocaleString("ru-RU", { month: "long", day: "numeric" }),
          lessons: [
            {
              number: el.pairnumber,
              name: el.dis,
              startTime: setTime(el.timestart).toLocaleTimeString(["ru-RU"], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              endTime: setTime(el.timeend).toLocaleTimeString(["ru-RU"], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              teacher: { ...el.teacher },
              location: { ...el.room },
              online: el.online,
              subgroup: el.subgroup,
              links: { ...el.links },
            },
          ],
        });
        lastDayWeekIndex = dayWeek;
      } else {
        schedule[schedule.length - 1].lessons.push({
          number: el.pairnumber,
          name: el.dis,
          startTime: setTime(el.timestart).toLocaleTimeString(["ru-RU"], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endTime: setTime(el.timeend).toLocaleTimeString(["ru-RU"], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          teacher: { ...el.teacher },
          location: { ...el.room },
          online: el.online,
          subgroup: el.subgroup,
          links: { ...el.links },
        });
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
