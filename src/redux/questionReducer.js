const SET_QUESTION = "SET_QUESTION";
const SET_IS_FORM_VISIBLE = "SET_IS_FORM_VISIBLE";
const SET_IS_VARIANT_FORM_VISIBLE = "SET_IS_VARIANT_FORM_VISIBLE";
const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
const SET_VARIANTS = "SET_VARIANTS";
const DELETE_VARIANT = "DELETE_VARIANT";

const initialState = {
    activeCategory: null,
    currentQuestion: null,
    currentVariants: [],
    isFormVisible: false,
    isVariantFormVisible: false
}

export default function questionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_QUESTION:
            return {...state, currentQuestion: action.payload};
        case SET_IS_FORM_VISIBLE:
            return {...state, isFormVisible: action.payload};
        case SET_IS_VARIANT_FORM_VISIBLE:
            return {...state, isVariantFormVisible: action.payload};
        case DELETE_VARIANT:
            return {...state, currentVariants: [...state.currentVariants.filter(item => item.id !== action.payload)]}
        case SET_VARIANTS:
            return {...state, currentVariants: action.payload}
        case SET_ACTIVE_CATEGORY:
            return {...state, activeCategory: action.payload};
        default:
            return state;
    }
}

export const setQuestion = (question) => ({type: SET_QUESTION, payload: question});
export const setVariants = (variants) => ({type: SET_VARIANTS, payload: variants});
export const setIsFormVisible = (boolean) => ({type: SET_IS_FORM_VISIBLE, payload: boolean});
export const setIsVariantFormVisible = (boolean) => ({type: SET_IS_VARIANT_FORM_VISIBLE, payload: boolean});
export const deleteVariant = (variantId) => ({type: DELETE_VARIANT, payload: variantId});
export const setActiveCategory = (category) => ({type: SET_ACTIVE_CATEGORY, payload: category});
// export const logout = () => ({type: LOGOUT});