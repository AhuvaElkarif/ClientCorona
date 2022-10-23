import axios from "axios";
import * as actionType from '../reducers/actionType';

export const getCities = () => {
    return dispatch => {
        axios.get("http://localhost:57828/Api/city/GetCities")
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_CITIES,
                    payload: response.data
                });
            })
            .catch(err => alert('קרתה תקלה זמנית באתר'))
    }
}