import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from './components/pages/About';
import TodoActions from './components/TodoActions';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => this.setState({todos: res.data }));
  }

  // Toggle complete
  markComplete = id => {
    console.log("from app js", id);

    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => {
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      });
    });
    
  };

  addTodo = title => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => {
      this.setState({
        todos: [...this.state.todos, res.data]
      });
    })
    
  };

  displayCompleted = () => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.completed)]
    })
  }

  displayAll = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => this.setState({todos: res.data }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />

            <Route
              path="/"
              exact
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <TodoActions displayCompleted={this.displayCompleted} displayAll={this.displayAll} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
