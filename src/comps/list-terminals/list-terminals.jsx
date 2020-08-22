import React from "react";
import "./list-terminals.css";

const ListTerminals = ({ terminals, deleteTerminal }) => {
  const renderedTerminals = terminals.map((terminal) => (
    <tr key={terminal.id}>
      <td>
        <div className="list-terminals__item-title">{terminal.title}</div>
      </td>
      <td>
        <div className="list-terminals__item-description">
          {terminal.description}
        </div>
      </td>
      <td>
        <div className="list-terminals__item-delete">
          <button
            className="button--danger"
            onClick={() => deleteTerminal(terminal.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ));
  return (
    <div className="list-terminals__items">
      <table className="list-terminals__table">
        <thead>
          <tr>
            <th className="list-terminals__title">Title</th>
            <th className="list-terminals__description">Description</th>
            <th className="list-terminals__actions">Actions</th>
          </tr>
        </thead>
        <tbody>{renderedTerminals}</tbody>
      </table>
    </div>
  );
};

export default ListTerminals;
