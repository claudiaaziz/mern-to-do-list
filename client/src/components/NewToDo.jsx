import { useState } from 'react';
import '../styles/newToDo.scss';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const NewToDo = () => {
  const [content, setContent] = useState('');
  const { addToDo } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/todos/new', { content }).then((res) => {
      setContent('');
      addToDo(res.data);
    });
  };

  return (
    <form className='new' onSubmit={handleSubmit}>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className='btn' type='submit' disabled={content.length === 0}>
        Add
      </button>
    </form>
  );
};

export default NewToDo;
