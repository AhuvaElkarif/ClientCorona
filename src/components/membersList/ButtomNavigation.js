import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import Register from '../register/Register';
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function ButtomNavigation({member}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}>
        <BottomNavigationAction label="עדכון פרטים אישיים" icon={<PersonIcon />} />
        <BottomNavigationAction label="עדכון כתובת" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="עדכון פלאפון" icon={<PhoneIcon />} />
      </BottomNavigation>

       <Register type={value} member={member}/>
    </div>
  );
}