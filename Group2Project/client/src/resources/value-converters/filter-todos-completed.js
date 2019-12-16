export class FilterTodosCompletedValueConverter {
  toView(todos) {
    if (!todos) return;
    let filteredTodos = [];
    todos.forEach(todo => {
      if (todo.status == 'Completed') filteredTodos.push(todo);
    });
    return filteredTodos;
  }
}
