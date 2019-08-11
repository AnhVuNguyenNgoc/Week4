const onToggleTodo = (todoList, id) => {

    // log array toList, setToDoList
    const todo = todoList.find(todo => todo.id === id);
    todo.status = todo.status === 'Done' ? 'Active' : 'Done';
    const foundIndex = todoList.findIndex(todo => todo.id === id);
    todoList[foundIndex] = todo;
    const newTodoList = [...todoList];

    setTodoList(newTodoList);

    setTimeout(() => {
        props.navigation.navigate("SingleTodo", {
            updatedTodo: todo
        });
    }, 1000);
};


export { onToggleTodo };