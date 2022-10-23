import axios from "axios";
import swal from "sweetalert";
import * as actionType from '../reducers/actionType';

export const getMembers = () => {
    return dispatch => {
        dispatch({
            type: actionType.SET_LOADING,
            payload: true
        });
        axios.get("http://localhost:57828/Api/member/GetMembers")
            .then(response => {
                dispatch({
                    type: actionType.SAVE_ALL_MEMBERS,
                    payload: response.data
                });
                dispatch({
                    type: actionType.SET_LOADING,
                    payload: false
                });
            })
            .catch(err => alert('קרתה תקלה זמנית באתר'))
    }
}

export const addMember = (member) => {
    return dispatch => {
        axios.post("http://localhost:57828/Api/member/addMember", member)
            .then(response => {
                if (response.data == null)
                    alert("לקוח זה כבר קיים אצלנו");
                else {
                    dispatch({
                        type: actionType.MEMBER_ADDED,
                        payload: response.data
                    });
                    swal({
                        title: "הלקוח נרשם בהצלחה!",
                        icon: "success"
                    });
                }
            })
            .catch(err => { alert("קרתה תקלה זמנית באתר"); console.log(err) })
    }
}

export const deleteMember = (id, ind) => {
    return dispatch => {
        axios.delete("http://localhost:57828/Api/attraction/delete/" + id)
            .then(response => {
                dispatch({
                    type: actionType.MEMBER_DELETED,
                    payload: ind
                });
                console.log(response);
            })
            .catch(err => { alert("קרתה תקלה זמנית באתר"); console.log(err) })
    }
}

export const updateMember = (member) => {
    return dispatch => {
        axios.put("http://localhost:57828/Api/member/updateMember", member)
            .then(response => {
                swal({
                    title: "הלקוח עודכן בהצלחה!",
                    icon: "success"
                });
                dispatch({
                    type: actionType.MEMBER_UPDATED,
                    payload: member
                });
                console.log(response);
            })
            .catch(err => alert("קרתה תקלה זמנית באתר"+err))
    }
}

export const changeMemberStatus = (id) => {
    return dispatch => {
        axios.put("http://localhost:57828/Api/member/ChangeStatus?id=" + id)
            .then(response => {
                swal({
                    title: "הלקוח נמחק בהצלחה!",
                    icon: "success"
                })
                dispatch({
                    type: actionType.ACTIVE_MEMBER_CHANGED,
                    payload: response.data
                });
            })
            .catch(err => alert("קרתה תקלה זמנית באתר"))
    }
}


