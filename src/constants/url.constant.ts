const rootUrl = 'http://194.233.71.230:3200/todo';
// const rootUrl = 'http://localhost:3200/todo';

export const URL = Object.freeze({
  allTodo: `${rootUrl}/list/all`,
  todayTodo: `${rootUrl}/list/today`,
  addTodoItem: `${rootUrl}/new`,
  updateTodoItem: `${rootUrl}/update`,
  deleteTodoItem: `${rootUrl}`,
  markTodoItemAsCompleted: `${rootUrl}/mark-completed`,
});
