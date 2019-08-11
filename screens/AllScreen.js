import React, { useState } from 'react';
import {
  Text, View, Alert, StyleSheet, TouchableOpacity, TextInput, ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import { TODOS } from '../utils/data.js';


const TodoItem = ({ todo, idx, onToggleTodo, onDeleteTodo }) => {
  const statusStyle = {
    backgroundColor: todo.status === 'Done' ? '#ffae3d' : '#be3dff'
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


export default function AllScreen(props) {

  const [todoList, setTodoList] = useState(TODOS);
  const [todoBody, setTodoBody] = useState('');
  const [totalTodo, setTotalTodo] = useState({ done: 0, active: 0 });

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



  const onDeleteTodo = id => {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    console.log(newTodoList)
    setTodoList(newTodoList);
  };

  const onToggleTodo = (id) => {

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

  // Lúc đầu mình lại nghĩ đặt trong đây ta ????
  // const onLongPress = todo => {

  return (

    <ImageBackground style={styles.container} source={require('../assets/images/background.jpg')}>
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.keyBoard}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: "200%" }}>
           
            {/* ... code ... */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>

  );
}

AllScreen.navigationOptions = {
  title: 'All Todos',
  headerTintColor: '#3dbeff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3dbeff',
  },
  todoItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    minHeight: 50,
    width: '95%',
    color: 'white',
    borderRadius: 5,
    flexWrap: 'wrap',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  todoText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  todoInput: {
    width: '100%',
    minHeight: 30,
    color: '#5d3dff',
    borderWidth: 1,
    marginTop: '10%',
    marginBottom: '5%',
    borderColor: 'grey',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 5,
  },
  inputContainer: {
    flex: 1,
    width: '95%',
    marginTop: 20,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginLeft: 5
  },
  button: {
    height: 50,
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#5d3dff',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  scrollView: {
    flex: 1,
    paddingTop: 1000
  },
  keyBoard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
});