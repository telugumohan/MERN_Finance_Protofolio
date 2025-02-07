import React from "react";
import callSvg from "../../assets/mobile.svg";

const UserCard3 = ({ userDetails }) => {
  return (
    <div className="flex justify-start items-center max-w-sm h-56 bg-black rounded-2xl p-2 shadow-2xl shadow-black">
      <div className="flex justify-center w-[40%] h-full rounded-2xl py-5">
        <img
          height={56}
          className="object-cover rounded-2xl"
          src={userDetails.picture.large}
          alt="User Image"
        />
      </div>
      <div className="flex-1 max-w-[60%] flex flex-col justify-center items-start gap-4 px-4 py-3 h-full rounded-2xl">
        <p className="text-white font-bold text-3xl font-mono">
          {userDetails.name.first} {userDetails.name.last}
        </p>
        <p className="text-gray-400 text-lg">{userDetails.gender}</p>
        <div className="flex justify-start items-center space-x-2">
          <img src={callSvg} alt="call svg" />
          <p className="text-gray-400 text-lg">{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard3;
