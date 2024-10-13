import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllUsers } from '../Redux/Slices/AuthSlice';
import UserCard from '../components/UserCard';

const Home = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);

  // Fetch all users on component mount
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8">All Users</h1>

      {/* Responsive grid layout for different screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Home;
