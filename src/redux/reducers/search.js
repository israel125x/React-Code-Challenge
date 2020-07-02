import { get } from 'lodash';
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

const initialStage ={};

export default function (state = initialStage, action){
    console.log('action to compare: ',action);
    switch (action.type){
        case SEARCH_MOVIE_START: 
            return {...state, isLoading: true};
            break;
        case SEARCH_MOVIE_ERROR:
            console.log(action);    
            return {...state, isLoading: false, movies: null};
            break;
        case SEARCH_MOVIE_COMPLETE: 
            console.log('SEARCH_MOVIE_COMPLETE',action);  
            return {...state, isLoading: false, movieResults: action.results.data};
            break;
        case SEARCH_MOVIE_BY_ID_START: 
            return {...state, isLoading: true, movieResult: null };
            break;
        case SEARCH_MOVIE_BY_ID_ERROR:
            console.log(action);    
            return {...state, isLoading: false, movieResult: null};
            break;
        case SEARCH_MOVIE_BY_ID_COMPLETE: 
            console.log('SEARCH_MOVIE_BY_ID_COMPLETE',action);  
            return {...state, isLoading: false, movieResult: action.movie.data};
            break;
            //--
        case SEARCH_MOVIE_ALL_START: 
            return {...state, isLoading: true, movieResult: null };
            break;
        case SEARCH_MOVIE_ALL_ERROR:
            console.log(action);    
            return {...state, isLoading: false, movieResult: null};
            break;
        case SEARCH_MOVIE_ALL_COMPLETE: 
            console.log('SEARCH_MOVIE_ALL_COMPLETE',action.results.data);  
            return {...state, isLoading: false, moviesResults: action.results.data};
            break;
            //--   
        default:
            console.log('Default: ',action); 
            return {state, isLoading: false, movies: null};    
    }
}