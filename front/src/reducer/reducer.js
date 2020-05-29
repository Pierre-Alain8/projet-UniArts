const initialState = {
  navMenuBool: false,
  modalDeletePoject: false,
  modalProjectBool: false,
  project: {},
  modalMediaBool: false,
  media: {},
  formArticleBool: false,
  article: {},
  formEditArticle: false,
};

// la fonction reducer englobe toute les actions de l'appli
function reducer(state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL_PROJECT_BOOL":
      return {
        ...state,
        modalProjectBool: true,
        project: action.project,
      }; // Au moment de la maj du state on ne change que ce qu'on utilise/ou besoin dans l'action

    case "CLOSE_MODAL_PROJECT_BOOL":
      return {
        ...state,
        modalProjectBool: false,
        project: {},
      };

    case "OPEN_MODAL_DELETE_PROJECT":
      return {
        ...state,
        modalDeletePoject: true,
        project: action.project,
      };

    case "CLOSE_MODAL_DELETE_PROJECT":
      return {
        ...state,
        modalDeletePoject: false,
        project: {},
      };

    case "OPEN_NAV_MENU_BOOL":
      return {
        ...state,
        navMenuBool: true,
      };

    case "CLOSE_NAV_MENU_BOOL":
      return {
        ...state,
        navMenuBool: false,
      };

    case "OPEN_MODAL_MEDIA_BOOL":
      return {
        ...state,
        modalMediaBool: true,
        media: action.media,
      };

    case "CLOSE_MODAL_MEDIA_BOOL":
      return {
        ...state,
        modalMediaBool: false,
        media: {},
      };

    case "SHOW_FORM_ARTICLE_BOOL":
      return {
        ...state,
        formArticleBool: true,
        formActive: "form-article isActive",
      };

    case "CANCEL_FORM_ARTICLE_BOOL":
      return {
        ...state,
        formArticleBool: false,
        formActive: "",
      };

    case "SHOW_FORM_EDIT_ARTICLE":
      return {
        ...state,
        formEditArticle: true,
        article: action.article,
      };

    case "CLOSE_FORM_EDIT_ARTICLE":
      return {
        ...state,
        formEditArticle: false,
        article: {},
      };

    default:
      return state;
  }
}

export default reducer;
