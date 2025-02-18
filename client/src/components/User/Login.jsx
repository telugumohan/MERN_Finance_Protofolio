import React, { useEffect, useState } from "react";
import InputFeild from "../InputFeilds/InputFeild";
import { useDispatch } from "react-redux";
import { signInAction, signUpAction } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if(profile) {
      navigate('/');
    }
  }, [navigate, dispatch, profile])
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const handleIsSignUpChange = () => {
    setIsSignUp(!isSignUp);
    setFormData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
  };
  const handleValueChange = (e) => {
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
   
    if(isSignUp) {
      // Do sign up
      const result = await dispatch(signUpAction(formData));
      if(signUpAction.fulfilled.match(result)) {
        navigate('/');
      }
    } else {
      // Do sign in
      const result = await dispatch(signInAction(formData));
      if(signInAction.fulfilled.match(result)) {
        navigate('/');
      }
    }
  }
  return (
    <main className="flex justify-between items-center space-x-10 min-w-screen min-h-screen px-8 relative py-[80px]">
      <div className="flex flex-col flex-1 justify-center items-center h-[560px] text-white bg-[#8B7F72]">
      <p className="text-6xl text-center font-bold mb-3">
      Unlock your future, your portfolio is ready for you!
        </p>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center h-[560px] space-y-3 text-white bg-[#8B7F72]">
        <p className="text-4xl font-bold mb-3">
          {isSignUp ? "Create an account" : "Welcome back!"}
        </p>
        <p className="cursor-pointer" onClick={handleIsSignUpChange}>
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>
        <form className="flex flex-col justify-start space-y-4 px-4 py-6 mx-10 w-[80%] min-h-[360px]" onSubmit={handleFormSubmit} > 
          {isSignUp && (
            <div className="flex justify-between items-center space-x-2">
              <InputFeild
                name={"fname"}
                type={"text"}
                placeHolderText={"First Name"}
                value={formData.fname}
                onValueChange={handleValueChange}
              />
              <InputFeild
                name={"lname"}
                type={"text"}
                placeHolderText={"Last Name"}
                value={formData.lname}
                onValueChange={handleValueChange}
              />
            </div>
          )}
          <InputFeild
            name={"email"}
            type={"text"}
            placeHolderText={"Email"}
            value={formData.email}
            onValueChange={handleValueChange}
          />
          <InputFeild
            name={"password"}
            type={"password"}
            placeHolderText={"Password"}
            value={formData.password}
            onValueChange={handleValueChange}
          />
          {isSignUp && (
            <InputFeild
            name={"confirmpassword"}
            type={"password"}
            placeHolderText={"Confirm Password"}
            value={formData.confirmpassword}
            onValueChange={handleValueChange}
          />
          )}
          <button type="submit" className="flex justify-center items-center px-4 py-2 bg-[#BBAA99] text-white text-lg font-medium cursor-pointer">
            {isSignUp ? ('Create account') : ('Sign In')}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
