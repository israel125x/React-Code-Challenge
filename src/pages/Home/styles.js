import { makeStyles }from '@material-ui/styles';
import { FormHelperText } from '@material-ui/core';

const centeredStyleObj ={
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export default makeStyles ({

    TituloML:{
        color:'white'
    },
    textFieldSearch:{
        marginLeft: '70vh',
        marginRight: '10px',
        width: '300px',
        backgroundColor: 'white'
         
    },
    searchButton:{
        marginLefth: '10px',
        marginRight: '10px'
    },
    buttonsContainer:{
        marginLefth:'10px',
        marginRight: '10px'
    }
});