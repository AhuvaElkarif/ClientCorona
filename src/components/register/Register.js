import { useDispatch, useSelector } from "react-redux";
import "./Register.css";
import * as React from "react";
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addMember, updateMember } from "../../store/actions/MemberAction";
import { getCities } from "../../store/actions/CityAction";
import SelectInput from "./SelectInput";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

const arr = [
    { lableName: "שם פרטי", name: "FirstName", type: "text" },
    { lableName: "שם משפחה", name: "LastName", type: "text" },
    { lableName: "תעודת זהות", name: "IdNumber", type: "text" },
    { lableName: "רחוב", name: "Street", type: "text" },
    { lableName: "מספר בית", name: "HouseNumber", type: "text" },
    { lableName: "תאריך לידה", name: "BirthDate", type: "date" },
    { lableName: "טלפון", name: "Telephone", type: "number" },
    { lableName: "פלאפון", name: "Phone", type: "number" },
]
const schema = yup.object().shape({
    FirstName: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    LastName: yup.string().required("שדה זה חובה").min(2, 'השם אינו תקין'),
    IdNumber: yup.string().required("שדה זה חובה").length(9, 'תעודת זהות אינה תקינה'),
    Street: yup.string().required("שדה זה חובה"),
    CityId: yup.string().required("שדה זה חובה"),
    HouseNumber: yup.string().required("שדה זה חובה"),
    BirthDate: yup.string().required("שדה זה חובה").max(new Date(), 'התאריך אינו תקין'),
    Telephone: yup.string().nullable().notRequired().when('Telephone', {
        is: (value) => value?.length,
        then: (rule) => rule.length(9, 'מספר הטלפון אינו תקין')
    }),
    Phone: yup.string().required("שדה זה חובה").length(10, 'מספר הפלאפון אינו תקין'),
}, [
    // Add Cyclic deps here because when require itself
    ['Telephone', 'Telephone'],
]).required();


const Register = ({ member }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const citiesArr = useSelector(state=>state.citiesArr);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        data.IsActive = true;
        if (member) {
            data.Id = member.Id;
            dispatch(updateMember(data))
        }
        else {
            dispatch(addMember(data));
        }
        navigate("/membersList");
    };
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="registerForm">

            {arr.map(item => <div key={item.name}>
                <Input
                    lableName={item.lableName}
                    name={item.name}
                    type={item.type}
                    errors={errors}
                    register={register}
                    member={member}
                     flag={false} /> 
                <br />
            </div>
            )}
            <SelectInput
                lableName={"עיר"}
                {...register("CityId")}
                arr={citiesArr}
                name={"CityId"}
                defaultValue={member?.CityId}
                errors={errors} />  <br />
            <Button variant="contained" size="medium" type="submit">
                {member ? "שמירת שינויים" : "הוספה"}
            </Button>
        </form>

    </>)
}
export default Register;