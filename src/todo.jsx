import React, { useState } from "react";
import "./todo.css";

const Todo = () => {
  const [msg, setmsg] = useState({
    text: "",
  });
  const [list, setlist] = useState([]);

  const changetxt = (e) => {
    setmsg({
      ...msg,
      text: e.target.value,
    });
  };

  // adding todo to the ul>li
  const addtodo = () => {
    setlist([
      ...list,
      {
        id: new Date().getTime().toString(),
        text: msg.text,
      },
    ]);
    setmsg({
      ...msg,
      text: "",
    });
  };

  // handling delete operation
  const handledelete = (id) => {
    if (list.length > 1) {
      let newtodos = list.filter((item) => item.id !== id);
      setlist(newtodos);
    }
  };

  // handling edit of ul>li

  const [editing, setediting] = useState({
    id: "",
    isediting: false,
  });
  const handleedit = (id) => {
    setediting({
      ...editing,
      id: id,
      isediting: true,
    });
    let edit = list.find((e) => e.id == id);
    setmsg({
      ...msg,
      text: edit.text,
    });
  };
  // handling the editing part & submiting the edit
  const submitEdit = () => {
    let newtodos = list.map((e) => {
      if (e.id == editing.id) {
        return {
          text: msg.text,
          id: editing.id,
        };
      } else {
        return e;
      }
    });
    setlist(newtodos);
    setediting({
      ...editing,
      id: "",
      isediting: false,
    });
    setmsg({
      ...msg,
      text: "",
    });
  };

  return (
    <div className="main">
      <div className="head">
        <input
          type="text"
          placeholder="Enter ur todo"
          value={msg.text}
          onChange={changetxt}
        />
        {editing.isediting ? (
          <button onClick={submitEdit}>Edit</button>
        ) : (
          <button onClick={addtodo}>Add</button>
        )}
      </div>
      <ul>
        {list.map(({ text, id }) => {
          if (text) {
            return (
              <li key={id}>
                <span id="todo_txt">{text}</span>
                <button id="edit" onClick={() => handleedit(id)}>
                  Edit
                </button>
                <button
                  id="delete"
                  onClick={() => {
                    handledelete(id);
                  }}
                >
                  delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Todo;
