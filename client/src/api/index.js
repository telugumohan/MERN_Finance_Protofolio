import axios from "axios";

const url = "https://randomuser.me/api/?page=1&results=1&seed=abc";
export const fetchUsersDataFromApi = async () => (axios.get(url));