
const initialState = {
    modalProjectBool: false,
}

// la fonction reducer englobe toute les actions de l'appli
function reducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL_PROJECT_BOOL":
            return {
                modalProjectBool: true
            }
            // break;
        case "CLOSE_MODAL_PROJECT_BOOL":
            return {
                modalProjectBool: false
            }
            // break;
    
        default: 
        return state
            
    }
}

export default reducer