import React, { useState } from 'react';
import { Text, View, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { TODOS } from '../utils/data.js';


const TodoItem = ({ todo, idx, onToggleTodo, onDeleteTodo }) => {
  const statusStyle = {
    backgroundColor: todo.status === 'Done' ? 'blue' : 'green'
  };

  const onLongPress = todo => {
    const prompt = `"${todo.body}"`;
    Alert.alert(
      'Delete your todo?',
      prompt,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => onDeleteTodo(todo.id) }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      key={todo.body}
      style={[styles.todoItem, statusStyle]}
      onPress={() => onToggleTodo(todo.id)}
      onLongPress={() => onLongPress(todo)}
    >
      <Text style={styles.todoText}>
        {idx + 1}: {todo.body}
      </Text>

    </TouchableOpacity>
  );
};


export default function AllScreen() {

  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');

  const onSubmitTodo = () => {
    const newTodo = {
      body: todoBody,
      status: 'Active',
      id: todoList.length + 1
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    setTodoBody('');
  };


  const onToggleTodo = id => {

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

  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    console.log(newTodoList)
    setTodoList(newTodoList);
  };

  // Lúc đầu mình lại nghĩ đặt trong đây ta ????

  // const onLongPress = todo => {
  //   const prompt = `"${todo.body}"`;
  //   Alert.alert(
  //     'Delete your todo?',
  //     prompt,
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel'
  //       },
  //       { text: 'OK', onPress: () => props.onDeleteTodo(todo.id) }
  //     ],
  //     { cancelable: true }
  //   );
  // };

  return (
    <View style={styles.container}>
      {todoList.map((todo, idx) => {
        return <TodoItem key={todo.body} todo={todo} idx={idx} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />;
      })}
      <View style={styles.inputContainer}>
        <TextInput
          value={todoBody}
          style={styles.todoInput}
          onChangeText={text => setTodoBody(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onSubmitTodo}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

AllScreen.navigationOptions = {
  title: 'All Todos'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  todoItem: {
    margin: 5,
    padding: 10,
    width: '95%',
    minHeight: 20,
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap'
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },

  todoInput: {
    width: '95%',
    minHeight: 30,
    color: 'white',
    borderWidth: 1,
    marginTop: '20%',
    marginBottom: '5%',
    borderColor: 'grey'
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});