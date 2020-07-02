import React from 'react';
import { Card, Grid, Typography, Button, Link, Container,Checkbox} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import style from './style';

const Movie =({Poster, Id, Titulo, history, cangeList})=>{
    const classes = style();

    const handleSeeMovieClick =() =>{
        window.open('https://www.imdb.com/title/'+Id, '_blank');
    }
    
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log('event.target.checked:',event.target.checked+' -> Id = '+Id);
        cangeList({op: event.target.checked , id: Id});
      };

    return(
        <div style={{marginLeft:'10px'}}>
            <Card className={classes.carContainer} >
                <Container>
                    <div style={{width: '100%'}}>
                        <div style={{float: 'left', width:'20%'}}>
                            <Link onClick={handleSeeMovieClick}>
                            <img src={Poster} alt={Titulo} className={classes.poster}/>
                            </Link>
                        </div>
                        <div style={{float:'left', width:'50%'}} >
                            <Typography className={classes.titleContainer} >
                                {Titulo} 
                            </Typography> 
                        </div>
                        <div style={{float:'left', width:'20%'}} >
                            <Checkbox style={{color:'white'}}
                                checked={checked}
                                onChange={handleChange}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </div>
                        </div>
                
                </Container>
            </Card>
        </div>      
    );   
}

export default withRouter(Movie);