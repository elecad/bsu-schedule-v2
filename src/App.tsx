import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { groupLessonAPI } from "./dto/groupLessonAPI";
import useAPI from "./hooks/useAPI";

function App() {
  const [lessons, setLessons] = useAPI();

  return <Container maxWidth="md">123</Container>;
}

export default App;
