import React, { Component, useReducer } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Link from 'next/link'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//         width: '25ch',
//       },
//     },
//   }),
// );
// const classes = useStyles();

class Edit extends Component{
  render(){
    return (
      // <form className={classes.root} noValidate autoComplete="off">
      //   <TextField id="standard-basic" label="Standard" />
      //   <TextField id="filled-basic" label="Filled" variant="filled" />
      //   <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <div>
          <button style={{margin:"1%"}}>{' '}
            <Link href="/">
            <a>戻る</a>
            </Link>{' '}
          </button>  
        </div>
      // </form>
    );
  }
}

export default Edit
