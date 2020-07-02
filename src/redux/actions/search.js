import { SEARCH_MOVIE_START, SEARCH_MOVIE_BY_ID_START , SEARCH_MOVIE_ALL_START} from '../../consts/actionTypes';

export const searchMovie = payload =>({
    type: SEARCH_MOVIE_START,
    payload

});

export const searchMovieById = payload =>({
    type: SEARCH_MOVIE_BY_ID_START, 
    payload
})

export const searchAll = payload =>({
    type: SEARCH_MOVIE_ALL_START,
    payload
})