import React from 'react';
import "../hojas-de-estilos/ListaTareas.css";

const TaskList = ({
  tasks,
  toggleTask,
  deleteTask,
  editingTaskId,
  handleTaskEdit,
  editTask,
}) => {
  const handleKeyDown = (taskId, event) => {
    if (event.key === 'Enter') {
      handleTaskEdit(taskId, event.target.value);
      editTask(null); // Terminar la edición
    }
  };

  return (
    <div className="lista-de-tarea">
      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
          {editingTaskId === task.id ? (
            <input
              type="text"
              value={task.text}
              onChange={(e) => handleTaskEdit(task.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(task.id, e)}
            />
          ) : (
            <>
              <span
                className={task.completed ? 'completed' : ''}
                onClick={() => toggleTask(task.id)}
              >
                 {task.text} {task.completed ? '👍' : '🤔'}
              </span>
              <button onClick={() => editTask(task.id)} className='btn1.0'>Editar</button>
              <button onClick={() => deleteTask(task.id)} className='btn1.1'>Eliminar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;

