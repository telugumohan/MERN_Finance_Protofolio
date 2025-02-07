import React from "react";
import callSvg from "../../assets/mobile.svg";
import callDarkSvg from "../../assets/mobile_dark2.svg";

const UserCard6 = ({ userDetails }) => {
  return (
    <div className="flex justify-start items-center min-w-sm max-w-sm h-56 bg-blue-300 rounded-2xl p-2 shadow-2xl shadow-blue-800">
      <div className="flex justify-center w-[40%] h-full rounded-2xl">
        <img
          height={56}
          className="object-cover rounded-xl"
          src={userDetails.picture.large}
          alt="User Image"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start gap-4 px-4 py-3 h-full rounded-2xl">
        <p className="text-black font-bold text-4xl">
          {userDetails.name.first} <br /> {userDetails.name.last}
        </p>
        <p className="text-gray-500 text-lg">{userDetails.gender}</p>
        <div className="flex justify-start items-center space-x-2">
          <img src={callDarkSvg} alt="call svg" />
          <p className="text-gray-500 text-lg">{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard6;
