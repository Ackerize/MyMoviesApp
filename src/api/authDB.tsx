import axios from 'axios';


const authDB = axios.create({
    baseURL: ' https://reqres.in/api',
});


export default authDB;