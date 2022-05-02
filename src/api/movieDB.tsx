import axios from 'axios';


const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '8b0d74148ce8eb86743111a615d3d240',
    }
});


export default movieDB;