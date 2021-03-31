import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export function CustomSnackbar({type, open, close, time, message}){
    open && setTimeout(() => close(), time);
    return (
        <Snackbar open={ open } autoHideDuration={0.1}>
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                severity={type.toLowerCase()} 
                icon={' '}
            >
                <div style={{color:'white'}}>
                    { type === 'SUCCESS' && <i className="fas fa-check-circle" style={{marginRight:'10px'}}></i> }
                    { type === 'INFO' && <i className="fas fa-exclamation-triangle" style={{marginRight:'10px'}}></i> }
                    { type === 'WARNING' && <i className="fas fa-exclamation-triangle" style={{marginRight:'10px'}}></i> }
                    { type === 'ERROR' && <i className="fas fa-bomb" style={{marginRight:'10px',fontSize:'20px'}}></i> }
                    { message }
                    <i className="fas fa-times" onClick={()=> close()} style={{marginLeft:'20px',cursor:'pointer'}}></i>
                </div>
            </MuiAlert>
        </Snackbar>
    )
}