import { createContext, useState, useCallback } from "react";
import axios from "axios";

const ListsContext = createContext();

function Provider({ children }) {
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/todo");
      const array = response.data;
      const newTasks = array
        .filter((array) => !array.done)
        .sort((a, b) => a.text.localeCompare(b.text));
      const newDoneTasks = array
        .filter((array) => array.done)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
        .sort((a, b) => a.text.localeCompare(b.text));
      setTodos(newTasks);
      setDones(newDoneTasks);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Add a new todo task
  const addTodo = async (text) => {
    const response = await axios.post("http://localhost:3001/api/todo", {
      text,
    });

    const updatedTodos = [...todos, response.data].sort((a, b) =>
      a.text.localeCompare(b.text)
    );
    setTodos(updatedTodos);
  };

  const handleToggleTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const updatedDones = todos.find((todo) => todo.id === id);

    try {
      await axios.put(`http://localhost:3001/api/todo/${id}`, {
        done: true,
      });

      setTodos(updatedTodos);
      setDones((dones) => {
        const newDones = [updatedDones, ...dones];
        return newDones
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .sort((a, b) => a.text.localeCompare(b.text));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleDone = async (id) => {
    const updatedDones = dones.filter((done) => done.id !== id);
    try {
      await axios.delete(`http://localhost:3001/api/todo/${id}`);
      setDones((dones) => {
        return updatedDones
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .sort((a, b) => a.text.localeCompare(b.text));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm || searchTerm === "") {
      // if the search term is empty or null, display the original lists
      fetchTodos();
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredDones = dones
        .filter((done) =>
          done.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);

      setTodos(filteredTodos);
      setDones(filteredDones);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await axios.delete("http://localhost:3001/api/todo");
      setTodos([]);
      setDones([]);
    } catch (error) {
      console.log(error);
    }
  };

  const valueToshare = {
    todos,
    dones,
    fetchTodos,
    addTodo,
    handleToggleTodo,
    handleToggleDone,
    handleSearch,
    handleDeleteAllTasks,
  };
  return (
    <ListsContext.Provider value={valueToshare}>
      {children}
    </ListsContext.Provider>
  );
}

export { Provider };
export default ListsContext;
