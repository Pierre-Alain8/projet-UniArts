import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const DeleteModalProject = () =>{

    // Ce sont les useState qui remplace le this.state et le This.setSate


    // useSelector consiste à rappeler un state général définis dans le store
    const  modalDeletePoject = useSelector(state => state.modalDeletePoject)

    // Rappel des actions Redux:
    const dispatch = useDispatch()
    console.log("modalDeletePoject:",  modalDeletePoject) 

    // Les méthodes:
    const closeModalDelete = () => {
        dispatch({type: 'CLOSE_MODAL_DELETE_PROJECT'})
    }

    
    
    // Modal material-ui:
    return (
        <div >

            <p>hello</p>
            {/* <Dialog
                open={modalDeletePoject}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <button onClick={closeModalDelete} color="primary">
                    Oui
                </button>
                <button onClick={closeModalDelete} color="primary" autoFocus>
                    None
                </button>
                </DialogActions>
            </Dialog> */}
        </div>
        
      );
}

export default DeleteModalProject

//  const deleteProject = (event) => {
//     let token = localStorage.getItem('token');

//     fetch(`http://localhost:5000/user/deleteProject/` + project._id, {
//         headers:{
//             "Authorization": "Bearer " + token,
//         },
//         method: 'DELETE',
//     })
//     .then((res) =>{
//         return res.json()
//     })
//     .then((res) =>{
//         console.log('removed success: ', res)
//     })
// }

/* <button onClick={closeModalDelete} color="primary">
                Oui
              </button>
              <button onClick={closeModalDelete} color="primary" autoFocus>
                non
              </button> */