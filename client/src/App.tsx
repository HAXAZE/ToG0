// import { Container, Stack } from '@chakra-ui/react'
// import Navbar from './components/ui/Navbar'
// import TodoForm from './components/ui/TodoForm'
// import TodoList from './components/ui/TodoList';

// export const BASE_URL = "http://localhost:4000/api";
// function App() {
//   return (
//     <Stack h = '100vh'>
//       <Navbar/>
//       <Container>
//         <TodoForm/>
//         <TodoList/>
//       </Container>
//     </Stack>
//   );
// }

// export default App;


import { Container, Stack, Heading } from "@chakra-ui/react";
import Navbar from "./components/ui/Navbar";
import TodoForm from "./components/ui/TodoForm";
import GeminiTodoForm from "./components/ui/GeminiTodoForm";
import TodoList from "./components/ui/TodoList";

export const BASE_URL = "http://localhost:4000/api";

function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        <Heading size="lg" mb={4}>
          Manual Todo Form
        </Heading>
        <TodoForm /> {/* Form for adding manual tasks */}

        <Heading size="lg" mt={6} mb={4}>
          AI-Powered Todo Form
        </Heading>
        <GeminiTodoForm /> {/* Form for AI-powered tasks */}

        <Heading size="lg" mt={6} mb={4}>
          Task List
        </Heading>
        <TodoList /> {/* Display the list of tasks */}
      </Container>
    </Stack>
  );
}

export default App;
