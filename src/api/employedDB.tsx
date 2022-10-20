import axios from 'axios';

const employedDB = axios.create({
    baseURL: 'https://6edeayi7ch.execute-api.us-east-1.amazonaws.com/v1/examen/employees',
});


export default employedDB;
