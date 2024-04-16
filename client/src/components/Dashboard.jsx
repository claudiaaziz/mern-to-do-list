import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  useEffect(() => {
    if (!user && navigate) navigate('/');
  }, [navigate, user]);

  return <div>Dashboard</div>;
};

export default Dashboard;
