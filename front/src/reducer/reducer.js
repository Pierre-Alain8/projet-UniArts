
const initialState = {
    modalDeletePoject: false,
    modalProjectBool: false,
    project:{}
}

// la fonction reducer englobe toute les actions de l'appli
function reducer(state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL_PROJECT_BOOL":
            return {
                ...state,
                modalProjectBool: true,
                project: action.project
            } // Au moment de la maj du state on ne change que ce qu'on utilise/ou besoin dans l'action

        case "CLOSE_MODAL_PROJECT_BOOL":
            return {
                ...state,
                modalProjectBool: false,
                project: {}
            };

        case "OPEN_MODAL_DELETE_PROJECT": 
            return{
                ...state,
                modalDeletePoject: true,
                project: action.project
            }

        case "CLOSE_MODAL_DELETE_PROJECT": 
            return{
                ...state,
                modalDeletePoject: false,
                project: {}
            };

        default: 
        return state
    };

}

export default reducer

