import * as React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCities } from '../../store/actions/CityAction';
import { getCoronaPatients } from '../../store/actions/CoronaPatientAction';
import { getMembers } from '../../store/actions/MemberAction';
import { getVaccinations } from '../../store/actions/VaccinationAction';
import SearchButton from './SearchButton';

const MembersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = React.useState('');
    const { membersArr, loading } = useSelector(state => {
        return {
            membersArr: state.membersArr,
            loading: state.loading
        }
    }, shallowEqual);
    React.useEffect(() => {
        dispatch(getMembers());
        dispatch(getCoronaPatients());
        dispatch(getVaccinations());
        dispatch(getCities());
    }, [])
    return (
        <div>
            <SearchButton search={({ target }) => setSearchValue(target.value)} />
            <ul>
                {loading?<p>טוען...</p> :
                 membersArr.map(item => {
                    if (item.FirstName.includes(searchValue) || item.LastName.includes(searchValue))
                        return <li key={item.Id} onClick={() => { navigate("/detailsMember/" + item.Id) }}>
                            {item.FirstName} {item.LastName}
                        </li>
                })}
            </ul>
        </div>
    );
}
export default MembersList;