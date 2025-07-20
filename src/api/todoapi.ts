import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL='https://dummyjson.com/todos';

export const getTodos = () => axios.get<{ todos: Todo[] }>('https://dummyjson.com/todos');

export const addTodo = (todo: Omit<Todo, 'id'>) =>
  axios.post<Todo>(`${API_URL}/add`, todo);

export const updateTodo = (id: number, todo: Partial<Todo>) =>
  axios.put<Todo>(`${API_URL}/edit/${id}`, todo);

export const deleteTodo = (id: number) =>
  axios.delete(`${API_URL}/delete/${id}`);