import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./terminals.css";
import ListTerminals from "../list-terminals/list-terminals";

const Terminals = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [terminals, setTerminals] = useState([]);

  const handlerChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlerChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const deleteTerminal = (id) => {
    setTerminals((prevTerminals) => {
      const filteredTerminals = prevTerminals.filter(
        (terminal) => terminal.id !== id
      );
      return filteredTerminals;
    });
  };

  const handleAddTerminal = (e) => {
    e.preventDefault();
    if (title !== "") {
      setTerminals((prevTerminals) => [
        {
          id: uuidv4(),
          title,
          description,
        },
        ...prevTerminals,
      ]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="terminals">
      <form className="terminals__form" onSubmit={handleAddTerminal}>
        <label htmlFor="terminalTitle" className="terminals__label">
          Title
          <input
            type="text"
            id="terminalTitle"
            value={title}
            onChange={handlerChangeTitle}
            className="terminals__input"
            placeholder="Title"
            required
          />
        </label>
        <label htmlFor="terminalDescription" className="terminals__label">
          Description
          <textarea
            rows="10"
            cols="33"
            id="terminalDescription"
            value={description}
            onChange={handlerChangeDescription}
            className="terminals__textarea"
            placeholder="Description"
          >
            helo
          </textarea>
        </label>
        <button className="button--default" type="submit">
          Add
        </button>
      </form>
      <ListTerminals terminals={terminals} deleteTerminal={deleteTerminal} />
    </div>
  );
};

export default Terminals;
