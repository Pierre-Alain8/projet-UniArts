
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
                modalProjectBool: true,
                project: action.project
            }

        case "CLOSE_MODAL_PROJECT_BOOL":
            return {
                modalProjectBool: false,
                project: {}
            };

        case "OPEN_MODAL_DELETE_PROJECT": 
            return{
                modalDeletePoject: true
            }

        case "CLOSE_MODAL_DELETE_PROJECT": 
            return{
                modalDeletePoject: false
            };

            
    
        default: 
        return state
    };

}

export default reducer