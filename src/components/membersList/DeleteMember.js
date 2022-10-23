import * as React from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { changeMemberStatus } from '../../store/actions/MemberAction';
import { useDispatch } from 'react-redux';

const DeleteMember = ({id}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const delMember = () => {
        dispatch(changeMemberStatus(id));
        navigate("/membersList");

    }
    return (<>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <Typography sx={{ p: 2, border: 1, bgcolor: 'background.paper', width: 150, height: 80 }} >
                            <span> האם אתה בטוח שברצונך למחוק את הלקוח? </span><br />
                            <Button variant="contained" size="small" style={{ margin: "3px" }} onClick={delMember}>  כן  </Button>
                            <Button variant="contained" size="small" onClick={() => { setOpen(false) }}>  לא  </Button>
                        </Typography>
                    </Paper>
                </Fade>
            )}
        </Popper>
        <Button onClick={handleClick('bottom-end')}>
            מחק לקוח
        </Button>
    </>
    )
}
export default DeleteMember;