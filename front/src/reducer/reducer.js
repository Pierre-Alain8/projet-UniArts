
const initialState = {
    modalProjectBool: false,
    project:{}
}

// la fonction reducer englobe toute les actions de l'appli
function reducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL_PROJECT_BOOL":
            return {
                modalProjectBool: true,
                project: action.project
            }
            // break;
        case "CLOSE_MODAL_PROJECT_BOOL":
            return {
                modalProjectBool: false,
                project: {}
            }
            // break;
    
        default: 
        return state
            
    }
}

export default reducer