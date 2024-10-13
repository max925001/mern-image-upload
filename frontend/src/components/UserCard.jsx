import React from 'react';
import { useNavigate } from 'react-router-dom';
import { incrementProfileView } from '../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleViews = async(e) => {
console.log(e)
 const res= await dispatch(incrementProfileView(user._id))

    console.log("res",res)
    navigate('/userProfile');



  }

  return (
    <div className="group perspective w-full max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:rotate-3 hover:scale-105 duration-300 hover:shadow-xl">
      <div className="p-6 text-center">
        {/* User Avatar */}
        <img 
          className="w-24 h-24 rounded-full mx-auto mb-4" 
          src={user.avatar.secure_url || 'default-avatar.png'} 
          alt={user.fullName} 
        />
        {/* User Full Name */}
        <h2 className="text-lg font-semibold mb-2">{user.fullName}</h2>
        {/* View Profile Button */}
        <button
          onClick={()=>{handleViews(user)}}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default UserCard;
