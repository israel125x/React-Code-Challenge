import  React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, CircularProgress, Button, Typography} from '@material-ui/core';
import queryString from 'query-string';

import { searchMovie } from '../../redux/actions/search';
import { movieResults, isSearchLoading } from '../../redux/selectors';
import MovieResult from '../../components/MovieResult';

export default ({ location }) => {
     const dispatch = useDispatch();
     const movies = useSelector(state => movieResults(state));
     console.log('movies: ', movies);
     const isLoading = useSelector(state => isSearchLoading(state));
     const [isLooked, setIsLooked ] = useState(false);
     useEffect(() => {
         const { movieName }= queryString.parse(location.search);
         
         if(movieName && !isLooked){
             setIsLooked(true);
            dispatch(searchMovie({ movieName }));
         }
         
     });
     const handleReturn= event=>{
        window.open("https://examen-e5708.web.app/", "_self");
    }

     const renderMovies = () => {
         console.log('movies renderMovies: ',movies);
         if (movies){
            return (<div>
                    <div style={{height:'50px'}}></div>
                    <Button variant="contained" color="primary" size="large" onClick={handleReturn} >Regresar</Button>
                    <div>
                     <Typography style={{color:'white'}}>Resultados del la busqueda: </Typography>   
                    </div>
                    <div style={{height:'50px'}}>
                    </div>   
                    <div>
                    {movies.Search.map((value, index) => <MovieResult key={index} {...value}/>)}
                    </div>
                    </div>
                );
         }else{
             return <CircularProgress size={100} color= "primary"></CircularProgress>
         }
         return<div/>;
     };

    return(
        <Container>
            {renderMovies()}
        </Container>
    )
}