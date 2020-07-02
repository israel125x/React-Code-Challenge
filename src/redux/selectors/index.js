import { get } from 'lodash';

export const isSearchLoading = state => get(state, 'search.isLoading');
export const  movieResults= state => get(state, 'search.movieResults');
export const  movieResult= state => get(state, 'search.movieResult');
export const  moviesResults= state => get(state, 'search.moviesResults');
