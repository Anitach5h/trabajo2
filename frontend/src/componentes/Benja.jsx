import React, { useState } from 'react';
import "../hojas-de-estilos/Benja.css";
import TaskList from './ListaTareas';
import BarraBusqueda from './BarraBusqueda'

function Benja() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); // Agrega el estado para edición

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, newTaskObj]);
    setFilteredTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleTaskEdit = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const editTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleSearch = (searchParams) => {
    const filtered = tasks.filter((task) => {
      return (
        task.text.toLowerCase().includes(searchParams.query.toLowerCase()) &&
        (searchParams.completed ? task.completed : true)
      );
    });

    setFilteredTasks(filtered);
  };

  const handleKeyDown = (taskId, event) => {
    if (event.key === 'Enter') {
      handleTaskEdit(taskId, event.target.value);
      setEditingTaskId(null); // Terminar la edición
    }
  };
  
  const handleAddKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask(); // Agregar tarea si se presiona "Enter"
    }
  };
  
  return (
    <div className='contenedor-principal'>
      <div className="contenedor-interno">
        <h1 className='titulo'>Lista de Tareas</h1>
        <div className="agregar-tarea">
          <input
            className='agregar-input'
            placeholder='Agregar aqui!'
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleAddKeyDown}
          />
          <button onClick={addTask}>Agregar</button>
        </div>
        <BarraBusqueda onSearch={handleSearch} />
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editingTaskId={editingTaskId}
          handleTaskEdit={handleTaskEdit}
          editTask={editTask}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Benja;
