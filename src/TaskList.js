import React, { useState } from 'react';
import {
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ tasks, addTask, updateTask, deleteTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState(''); // Add state for new task title

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return; // Prevent adding empty tasks

    const newTask = {
      title: newTaskTitle,
      state: 'ToDo',
      id: Date.now(),
    };

    addTask(newTask);
    setNewTaskTitle(''); // Clear the input after adding task
  };

  const handleUpdateTask = (index, updatedTask) => {
    updateTask(index, updatedTask);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const taskIndex = source.index;
      const newState = destination.droppableId;

      const updatedTask = { ...tasks[taskIndex], state: newState };
      handleUpdateTask(taskIndex, updatedTask);
    }
  };

  const sortedTasks = tasks
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {['ToDo', 'InProgress', 'Done'].map((state) => (
          <div key={state}>
            <h2>{state}</h2>
            <Droppable droppableId={state} key={state}>
              {(provided) => (
                <List ref={provided.innerRef} {...provided.droppableProps}>
                  {sortedTasks
                    .filter((task) => task.state === state)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ListItemText primary={task.title} />
                            <Select
                              value={task.state}
                              onChange={(e) => {
                                const newState = e.target.value;
                                handleUpdateTask(index, {
                                  ...task,
                                  state: newState,
                                });
                              }}
                            >
                              {['ToDo', 'InProgress', 'Done'].map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </div>
        ))}
      </div>
      <div>
        <TextField
          label="Enter new task"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)} // Update new task title state
        />
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
    </DragDropContext>
  );
};

export default TaskList;
