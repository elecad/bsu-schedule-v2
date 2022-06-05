const getScheduleTime = (time: number) => {
  return new Date(time * 1000).toLocaleTimeString(['ru-RU'], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getScheduleDate = (time: number) => {
  return new Date(time * 1000).toLocaleString('ru-RU', {
    month: 'long',
    day: 'numeric',
  });
};

const getWeekDay = (position: number) => {
  if (position > 6) return '';
  else
    return [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ][position];
};

const getDay = (time: number) => {
  return new Date(time * 1000).getDay();
};

export { getScheduleTime, getScheduleDate, getWeekDay, getDay };
