import { useRef, useState } from 'react';
import '../styles/toDoCard.scss';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const ToDoCard = ({ toDo }) => {
  const [content, setContent] = useState(toDo.content);
  const [isEditing, setIsEditing] = useState(false);
  const input = useRef(null);
  const { toDoComplete, toDoIncomplete, removeToDo, updateToDo } = useGlobalContext();

  const onEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    input.current.focus();
  };

  const onCancel = (e) => {
    if (e) e.preventDefault();
    setIsEditing(false);
    setContent(toDo.content);
  };

  const markAsComplete = (e) => {
    e.preventDefault();

    axios.put(`/api/todos/${toDo._id}/complete`).then((res) => {
      toDoComplete(res.data);
    });
  };

  const markAsIncomplete = (e) => {
    e.preventDefault();

    axios.put(`/api/todos/${toDo._id}/incomplete`).then((res) => {
      toDoIncomplete(res.data);
    });
  };

  const deleteToDo = (e) => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete this Todo?')) {
      axios.delete(`/api/todos/${toDo._id}`).then(() => {
        removeToDo(toDo);
      });
    }
  };

  const editToDo = (e) => {
    e.preventDefault();

    axios
      .put(`/api/todos/${toDo._id}`, { content })
      .then((res) => {
        updateToDo(res.data)
        setIsEditing(false);
      })
      .catch(() => onCancel());
  };

  return (
    <div className={`todo ${toDo.complete && 'todo--complete'}`}>
      <input
        type='checkbox'
        checked={toDo.complete}
        onChange={!toDo.complete ? markAsComplete : markAsIncomplete}
      />
      <input
        type='text'
        ref={input}
        value={content}
        readOnly={!isEditing}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='todo__controls'>
        {!isEditing ? (
          <>
            {!toDo.complete && <button onClick={onEdit}>Edit</button>}
            <button onClick={deleteToDo}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={editToDo}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
