import axios from "axios"
import * as actionType from '../reducers/actionType';

export const getCoronaPatients = () =>{
    return dispatch => {
        axios.get("http://localhost:57828/Api/coronaPatient/Get")
            .then(x => {
                dispatch({
                    type: actionType.SAVE_ALL_PATIENTS,
                    payload: x.data
                });
            })
            .catch(err => alert('קרתה תקלה זמנית באתר'))
    }
}
export const getLastCoronaPatients = () => {
    return axios.get("http://localhost:57828/Api/coronaPatient/GetNumberOfCoronaPatientsInLastMonth");
}