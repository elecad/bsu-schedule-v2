import { Container } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { groupLessonAPI } from './dto/scheduleAPI';
import { SCHEDULE_TYPES } from './enum/scheduleTypes';
import useAPI from './hooks/useAPI';

function App() {
  const [lessons, setLessons] = useAPI(SCHEDULE_TYPES.g);

  return <Container maxWidth="md">123</Container>;
}

export default App;
