import { useRef, useState } from 'react';
import '../styles/toDoCard.scss';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const ToDoCard = ({ toDo }) => {
  const [content, setContent] = useState(toDo.content);
  const [isEditing, setIsEditing] = useState(false);
  const input = useRef(null);
  const { toDoComplete, toDoIncomplete } = useGlobalContext();

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
            <button>Delete</button>
          </>
        ) : (
          <>
            <button onClick={onCancel}>Cancel</button>
            <button>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;
