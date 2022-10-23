import axios from "axios";
import * as actionType from '../reducers/actionType';

export const getVaccinations = () => {
    return dispatch => {
        axios.get("http://localhost:57828/Api/vaccination/Get")
            .then(x => {
                dispatch({
                    type: actionType.SAVE_ALL_VACCINATIONS,
                    payload: x.data
                });
            })
            .catch(err => alert('קרתה תקלה זמנית באתר'))
    }
}