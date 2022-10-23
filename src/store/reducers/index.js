import * as actionType from './actionType';
const initialState = {
    membersArr: [],
    vaccinatiosArr: [],
    coronaPatientsArr: [],
    citiesArr: [],
    loading: false
}

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionType.SAVE_ALL_MEMBERS:
            return {
                ...state,
                membersArr: action.payload
            }
        case actionType.SAVE_ALL_CITIES:
            return {
                ...state,
                citiesArr: action.payload
            }
        case actionType.MEMBER_ADDED:
            return {
                ...state,
                membersArr: [...state.membersArr, action.payload]
            }
        case actionType.MEMBER_UPDATED:
            const v = [...state.membersArr];
            const index = v.findIndex(x => x.Id === action.payload.Id);
            v[index] = action.payload;
            const array = [...state.citiesArr];
            const city = array.find(x => x.Id == action.payload.CityId);
            v[index].CityName = city.Name;
            return {
                ...state,
                membersArr: [...v]
            }
        case actionType.ACTIVE_MEMBER_CHANGED:
            const vec = [...state.membersArr];
            const findIndex = vec.findIndex(x => x.Id === action.payload.Id);
            vec.splice(findIndex, 1);
            return {
                ...state,
                membersArr: [...vec]
            }
        case actionType.SAVE_ALL_PATIENTS:
            return {
                ...state,
                coronaPatientsArr: action.payload
            }
        case actionType.SAVE_ALL_VACCINATIONS:
            return {
                ...state,
                vaccinatiosArr: action.payload
            }
        default:
            break;
    }
    return state;
}
export default storeReducer;