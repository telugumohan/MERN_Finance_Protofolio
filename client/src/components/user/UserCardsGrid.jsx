import React, { useEffect } from "react";
import {UserCard2, UserCard3, UserCard4, UserCard5, UserCard6, UserCard7, UserCard8} from "./index.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "../../features/userSlice";

const UserCardsGrid = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);
  const users = useSelector((state) => state.user_slice.users);
  const status = useSelector((state) => state.user_slice.status);
  return (
    <div>
      {status === "loading" ? (<div className="flex min-h-screen min-w-screen items-center justify-center">loading...</div>) : ""}
      {status === "success" ? (
        
        <div className="grid grid-cols-3 space-x-5 space-y-10 m-10">
          <UserCard2 userDetails={users.results[0]} />
          <UserCard3 userDetails={users.results[0]}/>
          <UserCard4 userDetails={users.results[0]} />
          <UserCard5 userDetails={users.results[0]} />
          <UserCard6 userDetails={users.results[0]} />
          <UserCard7 userDetails={users.results[0]} />
          <UserCard8 userDetails={users.results[0]} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserCardsGrid;
