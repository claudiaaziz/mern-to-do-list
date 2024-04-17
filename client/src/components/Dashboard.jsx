import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.scss';
import ToDoCard from './ToDoCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, completeToDos, incompleteToDos } = useGlobalContext();

  useEffect(() => {
    if (!user && navigate) navigate('/');
  }, [navigate, user]);

  return (
    <div className='dashboard'>
      <div className='todos'>
        {incompleteToDos.map((toDo) => (
          <ToDoCard toDo={toDo} key={toDo._id} />
        ))}
      </div>

      {completeToDos.length > 0 && (
        <div className='todos'>
          <h2 className='todos__title'>Completed ToDo's</h2>
          {completeToDos.map((toDo) => (
            <ToDoCard toDo={toDo} key={toDo._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
