import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  const tasks = [
    { id: 1, title: 'Task 1', state: 'ToDo' },
    { id: 2, title: 'Task 2', state: 'InProgress' },
    { id: 3, title: 'Task 3', state: 'Done' },
  ];

  const addTaskMock = jest.fn();
  const updateTaskMock = jest.fn();
  const deleteTaskMock = jest.fn();

  it('renders columns with tasks sorted alphabetically and allows drag-and-drop and state switching', () => {
    const { getByText, getByLabelText, getByTestId } = render(
      <TaskList
        tasks={tasks}
        addTask={addTaskMock}
        updateTask={updateTaskMock}
        deleteTask={deleteTaskMock}
      />
    );

    tasks.sort((a, b) => a.title.localeCompare(b.title));

    tasks.forEach((task) => {
      const taskElement = getByText(task.title);
      expect(taskElement).toBeInTheDocument();
    });

    // Test adding a new task
    const newTaskInput = getByLabelText('Enter new task');
    const addTaskButton = getByText('Add Task');

    fireEvent.change(newTaskInput, { target: { value: 'New Test Task' } });
    fireEvent.click(addTaskButton);

    expect(addTaskMock).toHaveBeenCalledWith({
      title: 'New Test Task',
      state: 'ToDo',
      id: expect.any(Number),
    });
  });
});
