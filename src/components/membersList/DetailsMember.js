import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteMember from './DeleteMember';
import Register from '../register/Register';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

const DetailsMember = () => {
    const { id } = useParams();
    const [coronaPatient, setCoronaPatient] = useState(null);
    const [edit, setEdit] = useState(false);
    const [vaccinationsMember, setVaccinationsMember] = useState([]);
    const { membersArr, vaccinations, coronaPatients } = useSelector(state => {
        return {
            membersArr: state.membersArr,
            vaccinations: state.vaccinatiosArr,
            coronaPatients: state.coronaPatientsArr
        }
    }, shallowEqual);
    const member = { ...membersArr.find(x => x.Id == id) };
    const arr = [
        { lableName: "תעודת זהות", value: member.IdNumber },
        { lableName: "כתובת", value: member.Street + " " + member.HouseNumber + " " + member.CityName },
        { lableName: "טלפון", value: member.Telephone },
        { lableName: "פלאפון", value: member.Phone },
        { lableName: "תאריך לידה", value: new Date(member.BirthDate).toLocaleDateString() },
    ]
    useEffect(() => {
        const arr = vaccinations.filter(x => x.MemberId == id);
        setVaccinationsMember(arr);
        setCoronaPatient(coronaPatients.find(x=> x.MemberId == id))
    }, [membersArr, id])
    
    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {member.FirstName} {bull} {member.LastName}
                        {/* עריכת משתמש */}
                        <EditIcon onClick={() => { setEdit(!edit) }} />
                    </Typography>
                    {/* פרטים אישיים */}
                    {arr.map(item =>
                        <Typography sx={{ mb: 1.5 }} key={item.lableName}>
                            {item.lableName}: {item.value}
                        </Typography>)}

                    {/* פרטים אודות החולי */}
                    {coronaPatient ? <Typography sx={{ mb: 1.5 }} >
                        חלה בתאריך: {new Date(coronaPatient.StartDate).toLocaleDateString()} <br /> 
                        מועד החלמה: {new Date(coronaPatient.EndDate).toLocaleDateString()}
                    </Typography> :
                        <Typography sx={{ mb: 1.5 }}>
                            לא חלה בקורנה
                        </Typography>}
                    {/* פרטי חיסונים */}
                    <h4>חיסונים</h4>
                    {vaccinationsMember.length>0 ?
                        vaccinationsMember.map(item => <div key={item.Id}>
                            <h5> חיסון מספר {item.NumVaccination} </h5>
                            <ul>
                                <li> סוג החיסון: {item.VaccinationName} , {item.VaccinationCountry} </li>
                                <li> תאריך החיסון: {new Date(item.Date).toLocaleDateString()} </li>
                            </ul></div>) :
                        <p>לא חוסנ/ה כלל</p>}

                    <DeleteMember id={member.Id} />
                </CardContent>
            </Card>
            <br /> <br />
            {edit && <Register member={member} />}
        </div>
    );
}
export default DetailsMember;