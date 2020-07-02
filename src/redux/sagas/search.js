import { put, call, takeLatest } from 'redux-saga/effects';
import {SEARCH_MOVIE_START, 
    SEARCH_MOVIE_ERROR, 
    SEARCH_MOVIE_COMPLETE,
    SEARCH_MOVIE_BY_ID_START,
    SEARCH_MOVIE_BY_ID_ERROR,
    SEARCH_MOVIE_BY_ID_COMPLETE,
    SEARCH_MOVIE_ALL_START, 
    SEARCH_MOVIE_ALL_ERROR, 
    SEARCH_MOVIE_ALL_COMPLETE,
 } from '../../consts/actionTypes';

import { apiCall } from '../api';
import { favoritos } from '../api';
import { omdbApi } from '../api';   
export function* searchMovie ({ payload}){
    try{
        console.log('payload.movieName: ',payload.movieName);
        //const results = yield call(apiCall, `&s=${payload.movieName}`,null,null,'GET');
        const results = yield call(omdbApi, `&s=${payload.movieName}`,null,null,'GET');
        yield put ({type: SEARCH_MOVIE_COMPLETE, results});
    } catch(error){
        console.log('error: ',error);
        yield put ({ type: SEARCH_MOVIE_ERROR, error });
    }
}

export function* searchMovieById ({ payload}){
    try{
        console.log('payload.movieName: ',payload.movieName);
        //const movie = yield call(apiCall, `&i=${payload.movieId}`,null,null,'GET');
        const movie = yield call(omdbApi, `&i=${payload.movieId}`,null,null,'GET');
        yield put ({type: SEARCH_MOVIE_BY_ID_COMPLETE, movie});
    } catch(error){
        console.log('error: ',error);
        yield put ({ type: SEARCH_MOVIE_BY_ID_ERROR, error });
    }
}

export function* searchAll ({ payload}){
    try{
        console.log('searchAll');
        //const results = yield call(apiCall, `&s=${payload.movieName}`,null,null,'GET');
        const results = yield call(favoritos, `/getfavoritos?hash=${payload.hash}`,null,null,'GET');
        console.log('results:', results)
        yield put ({type: SEARCH_MOVIE_ALL_COMPLETE, results});
    } catch(error){
        console.log('error: ',error);
        yield put ({ type: SEARCH_MOVIE_ALL_ERROR, error });
    }
}

export default function* search(){
    yield takeLatest(SEARCH_MOVIE_START, searchMovie);
    yield takeLatest(SEARCH_MOVIE_BY_ID_START, searchMovieById);
    yield takeLatest(SEARCH_MOVIE_ALL_START, searchAll);

}