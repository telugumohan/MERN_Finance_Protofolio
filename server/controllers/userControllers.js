import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'

export const signUpController = async (request, response) => {
    const {fname, lname, email, password, confirmpassword} = request.body;
    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser) return response.status(404).send('User with same email exists already!');

        if(password !== confirmpassword) response.status(404).send('Passwords did not match!');

        const hashedPassword = await bcryptjs.hash(password, 12);
       
        const newUser = await userModel.create({name: `${fname} ${lname}`, email, password: hashedPassword});
        const token = jwt.sign({email, id: newUser._id}, 'test', {expiresIn: "1h"});
        return response.status(200).json({user: newUser, token: token});
    } catch (error) {
        return response.status(500).json({error});
    }
}

export const signInController = async (request, response) => {
    const {email, password} = request.body;
    try {
        const existingUser = await userModel.findOne({email});
        if(!existingUser) return response.status(404).send('User does not exits!');
        
        const passwordsMatch = await bcryptjs.compare(password, existingUser.password);
        if(!passwordsMatch) response.status(404).send('Invalid Credentials!');

       
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});
        return response.status(200).json({user: existingUser, token: token});
    } catch (error) {
        return response.status(500).json({error});
    }
}