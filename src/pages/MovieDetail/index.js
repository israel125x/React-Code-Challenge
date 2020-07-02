import React, { useEffect , useState} from 'react';
import { Container, CircularProgress, Typography, Button,Card} from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';

import {movieResult as movieResultSelector} from '../../redux/selectors';
import { searchMovieById } from '../../redux/actions/search';
import axios from 'axios';
import {_getFingerprint} from '../Home';

export default ({movieId, close}) => {
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);

    const movieResult = useSelector(state => movieResultSelector(state));
    document.body.style = 'background: black;';
    console.log('movieResult: ',movieResult);
    useEffect(()=>{
        //const movieId = imdbID;//match.params.id;
        console.log('movieId: ',movieId);
        console.log('movieResult-> ',movieResult)
        if(!movieResult || movieResult && movieResult.imdbID !== movieId){
            //corregir
            dispatch(searchMovieById({movieId}));
        }
    });

    if(!movieResult){
        return <CircularProgress size={100} color="primary"></CircularProgress>
    }


    const handleAddFavoritos= event=>{
        console.log('add Favoritos');
        _getFingerprint().then((result)=>{
            console.log('hash: ',result);
            const hash = result; 
            axios.get(`https://us-central1-examen-e5708.cloudfunctions.net/insertfavoritos?hash=${hash}&id=${movieResult.imdbID}&poster=${movieResult.Poster}&title=${movieResult.Title}`)
            .then(res => {
                console.log(res);
                //close();
                setDisabled(true);
            })
        });  
    }
    const handleViewExt= event=>{
        console.log('ver en web externa');    
        window.open('https://www.imdb.com/title/'+movieId, '_blank');
    }

    return(    
        <Card style={{backgroundColor: 'gray'}}> 
        <Container style={{backgroundColor: 'gray'}}>
            <div style={{textAlign: 'center', width:'100%'}}>
                <Typography style={{color: 'white'}}>{movieResult.Title}</Typography>
                <img src={movieResult.Poster} style={{ width: '100px' }} alt={movieResult.Title}></img>
            </div>
            <Typography style={{color: 'white'}} ><strong>Lanzamiento: </strong>{movieResult.Released}</Typography>
            <Typography style={{color: 'white'}} ><strong>Pais: </strong>{movieResult.Country}</Typography>
            <Typography style={{color: 'white'}} ><strong>Clasificacion: </strong>{movieResult.Rated}</Typography>
            <Typography style={{color: 'white'}} ><strong>Duracion: </strong>{movieResult.Runtime}</Typography>
            <Typography style={{color: 'white'}} ><strong>Sinopsis: </strong>{movieResult.Plot}</Typography>
            <Typography style={{color: 'white'}} ><strong>Premios: </strong>{movieResult.Awards}</Typography>
            <Typography style={{color: 'white'}} ><strong>Actores: </strong>{movieResult.Actors}</Typography>
            <Typography style={{color: 'white'}} ><strong>Indioma: </strong>{movieResult.Language}</Typography>
            <div style={{marginTop: '10px',marginBottom: '5px'}} >
                <Button color="primary" variant="contained" style={{marginLeft: '50px'}} onClick={close}>Cerrar</Button>
                <Button disabled={disabled} color="primary" variant="contained" style={{marginLeft: '50px'}} onClick={handleAddFavoritos}>Agregar a Favoritos</Button> 
                <Button color="primary" variant="contained" style={{marginLeft: '50px'}} onClick={handleViewExt}>ver en OIMDV</Button>  
            </div>        
        </Container>
        </Card>
    );
}