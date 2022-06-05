import { Container } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SCHEDULE_TYPES } from './enum/scheduleTypes';
import useAPI from './hooks/useAPI';

function App() {
  const [lessons, setLessons] = useAPI(SCHEDULE_TYPES.g, 'Группа 12001902');
  console.log(lessons);

  return <Container maxWidth="md">123</Container>;
}

export default App;
