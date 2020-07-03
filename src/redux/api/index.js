import axios from 'axios';

const baseFav = 'https://us-central1-examen-e5708.cloudfunctions.net';
const omdbURL = 'https://www.omdbapi.com/?apikey=fd0bcd8b';


export const favoritos = (url,data,headers, metod)=>axios({
    metod,
    url: baseFav + url,
    data,
    headers
});

export const omdbApi = (url,data,headers, metod)=>axios({
    metod,
    url: omdbURL + url,
    data,
    headers
});
