import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function App() {
  // var todos = []
  // state
  var [todos, setTodos] = useState([]);
  var [input, setInput] = useState("");

  function getTodos() {
    axios.get("http://localhost:3636/todo").then(({ data }) => {
      // todos = data
      setTodos(data);
      console.log(data);
    });
  }

  function addTodo() {
    axios
      .post("http://localhost:3636/todo/create", {
        todo: input,
      })
      .then(({ data }) => {
        console.log(data);
        getTodos();
      });
  }

  function del(id) {
    console.log(id);
    axios.delete("http://localhost:3636/todo/" + id).then(({ data }) => {
      getTodos();
    });
  }

  function update(id) {
    console.log("http://localhost:3636/todo/" + id);
    axios
      .put("http://localhost:3636/todo/" + id, { todo: input })
      .then(({ data }) => {
        getTodos();
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <div className="form">
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addTodo();
          }}
        >
          add new todo
        </button>
      </div>
      <h1>Hello</h1>
      {todos.map((e, i) => {
        return (
          <li className="item">
            {e.todo}
            <button
              className="btn btn-danger"
              onClick={() => {
                del(e._id);
              }}
            >
              delete
            </button>
            <button
              className="update"
              onClick={() => {
                update(e._id);
              }}
            >
              update
            </button>
          </li>
        );
      })}
    </div>
  );
}

export default App;
