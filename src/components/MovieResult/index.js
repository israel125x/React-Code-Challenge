import React from 'react';
import { Card, Grid, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import usePortal from 'react-useportal';
import MovieDetail from '../../pages/MovieDetail';

import style from './style';

const MovieResult =({Title, Year, Type, imdbID, Poster, history })=>{
    const classes = style();
    const { isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal({
        onOpen({ portal }) {
          portal.current.style.cssText = `
            /* add your css here for the Portal */
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 1000;
          `
        }
      })


    console.log('imdbID:',imdbID);
    document.body.style = 'background: black;';
    return(
        <div style={{display: 'inline-block'}}>
            <div style={{margin: '20px'}}>
                <Card className={classes.carContainer}>
                    <img src={Poster} alt={Title} className={classes.poster}/>    
                </Card>
                <div style={{textAlign: 'center'}}>
                    <Typography style={{color:'white'}}>{Title}</Typography>
                    <Button color="primary" variant="contained" onClick={openPortal}>Ver mas</Button> 
                </div>
            </div>
            {isOpen && (
            <Portal>
                <MovieDetail movieId={imdbID} close={closePortal}/>
            </Portal>
            )}
        </div>
        
    );   
}

export default withRouter(MovieResult);