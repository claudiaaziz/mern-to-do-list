import { useRef, useState } from 'react';
import '../styles/toDoCard.scss';

const ToDoCard = ({ toDo }) => {
  const [content, setContent] = useState(toDo.content);
  const [isEditing, setIsEditing] = useState(false);
  const input = useRef(null);

  const onEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
    input.current.focus();
  };

  const onCancel = (e) => {
    if (e) e.preventDefault()
    setIsEditing(false)
    setContent(toDo.content)
  }

  return (
    <div className={`todo ${toDo.complete && 'todo--complete'}`}>
      <input type='checkbox' checked={toDo.complete} />
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
