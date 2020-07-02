import React, { useState, useEffect }from 'react';
import {Container,Typography,Card,Grid,TextField, Button,Box, CircularProgress} from '@material-ui/core';
import styles from './styles';
import { MovieIcon } from '../../icons';
import { useDispatch, useSelector } from 'react-redux';
import Fingerprint2 from 'fingerprintjs2';
import * as UAParser from 'ua-parser-js'
//--
import { searchMovie } from '../../redux/actions/search';
import { moviesResults, isSearchLoading } from '../../redux/selectors';
import MovieResult from '../../components/MovieResult';
import { searchAll } from '../../redux/actions/search';
import  Movie  from '../../components/Movie'
import axios from 'axios';
//--
export default ({history}) => {
    //------------------------
    const dispatch = useDispatch();
     const movies = useSelector(state => moviesResults(state));
     console.log('movies: ', movies);
     
     useEffect(() => { 
         if(!movies){
            _getFingerprint().then((result)=>{
                console.log('hash: ',result);
                const hash = result;
                dispatch(searchAll({hash})); 
            });
        
         }   
            
     });
    //------------------------
    const [ searchText, setSearchText]= useState('');
    const classes = styles();

    const handleSearchTextChange = event => {
        setSearchText(event.target.value)
    }
    const handleCleanTexClik = event=>{
        setSearchText('');
    }
    const handleSearchTexClik= event=>{
        history.push(`/results?movieName=${searchText}`);
    }
    let porEliminar =[]

    const cangeList=(item) =>{
      console.log('item: ',item);
      if(item.op===true){
        porEliminar.push(item.id);
      }else{
        console.log('item.id: ',item.id)
        const filtro= porEliminar.filter(id => id != item.id);
        console.log('filtro: ',filtro);
        porEliminar=filtro;
      }
      console.log('porEliminar: ',porEliminar);
  }
  const handleEliminar= event=>{
    console.log('handleEliminar start -> ',porEliminar);
    _getFingerprint().then((result)=>{
      console.log('hash: ',result);
      const hash = result;
      var p=0;
      porEliminar.forEach(element => {
        console.log('element: ',element);
        console.log('porEliminar.length: ',porEliminar.length);
        p=p+1;
        console.log('p: ',p);
        axios.get(`https://us-central1-examen-e5708.cloudfunctions.net/deletefavoritos?hash=${hash}&id=${element}`)
        .then(res => {
          console.log(res);
          if(p==porEliminar.length){
            dispatch(searchAll({hash}));    
          }
          })
        });
  });
  }
    document.body.style = 'background: black;';
    if(movies){ 
        return(
            <div>  
            <div className="row" style={{ width: '100%' },{backgroundColor:'black'}}>
                <div style={{display: 'inline-block'}}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' style={{ width: '100px' }}></img>  
                </div>
                <div style={{display: 'inline-block'}}>
                    <TextField
                        value={searchText}
                        placeholder="buscar"
                        className={classes.textFieldSearch}
                        onChange={handleSearchTextChange}>   
                    </TextField>
                </div>
                <div style={{display: 'inline-block'}}>
                    <Button variant="contained" color="primary" size="large" className={classes.searchButton} onClick={handleSearchTexClik} >Buscar</Button>
                </div>
            </div>
            <div style={{color: 'white',textAlign:'center', width:'100%'}}>
              <h2>Busca contenido y agregalo a tu lista de favoritos</h2>
              <div style={{display: 'inline-block'}}>
                    <Button variant="contained" onClick={handleEliminar} >borrar seleccion</Button>
              </div>
            </div>
            <div>
                {movies.map((value, index) => <Movie key={index} {...value} cangeList={cangeList} />)}
            </div>
            </div>
        )

    }else {
        return(
            <CircularProgress></CircularProgress>
        );
    }
}

export function _getFingerprint () {
    return new Promise((resolve, reject) => {
      async function getHash () {
        const options = {
          excludes: {
            plugins: true,
            localStorage: true,
            adBlock: true,
            screenResolution: true,
            availableScreenResolution: true,
            enumerateDevices: true,
            pixelRatio: true,
            doNotTrack: true
          },
          preprocessor: (key, value) => {
            if (key === 'userAgent') {
              const parser = new UAParser(value)
              // return customized user agent (without browser version)
              return `${parser.getOS().name} :: ${parser.getBrowser().name} :: ${parser.getEngine().name}`
            }
            return value
          }
        }
  
        try {
          const components = await Fingerprint2.getPromise(options)
          const values = components.map(component => component.value)
          console.log('fingerprint hash components', components)
  
          return String(Fingerprint2.x64hash128(values.join(''), 31))
        } catch (e) {
          reject(e)
        }
      }
  
      if (window.requestIdleCallback) {
        console.log('requestIdleCallback')
        requestIdleCallback(async () => resolve(await getHash()))
      } else {
        console.log('setTimeout')
        setTimeout(async () => resolve(await getHash()), 500)
      }
    })
  }