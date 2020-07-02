import axios from 'axios';

const baseURL = 'https://mfwkweb-api.clarovideo.net/services';
const baseFav = 'https://us-central1-examen-e5708.cloudfunctions.net';
const omdbURL = 'http://www.omdbapi.com/?apikey=fd0bcd8b';

export const apiCall = (url,data,headers, metod)=>axios({
    metod,
    url: baseURL + url,
    data,
    headers
});

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
