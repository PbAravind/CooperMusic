import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import TabletIcon from '@material-ui/icons/Tablet';
import useGlobal from '../../store/index'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      alignSelf: 'center'
    },
  },
  loginContainer: {
    display: 'flex',
    flexFlow: 'column',
    margin: '10%'
  },
  loginButton: {
    width: '10%',
    alignSelf: 'center'
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [device, setDevice] = React.useState('');
  const [state, actions] = useGlobal();

  const handleChange = (event, set) => {
    set(event.target.value);
  };

  const handleDeviceClick = (val) => {
    setDevice(val);
  }

  const handleLogin = async () => {
    let body = {
      username: name,
      password,
      loginDevice: device
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/user/login`, body)
      actions.setUserInfo(res.data);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      props.history.push("/")
    } catch (err) {
      window.alert(err.toString());
    }
  }

  console.log("State", state);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Paper className={classes.loginContainer} elevation={0}>
        <TextField id="emailId" label="Email ID" value={name} onChange={e => handleChange(e, setName)} variant="outlined" />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => handleChange(e, setPassword)}
          variant="outlined"
        />
        <Paper elevation={0}>
          <Typography>Login Device</Typography>
          <IconButton onClick={() => handleDeviceClick('Mobile')} aria-label="web" color={device === 'Mobile' ? "secondary" : "inherit"}>
            <PhoneAndroidIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => handleDeviceClick('Web')} aria-label="mobile" color={device === 'Web' ? "secondary" : "inherit"}>
            <DesktopWindowsIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => handleDeviceClick('Tablet')} aria-label="tab" color={device === 'Tablet' ? "secondary" : "inherit"}>
            <TabletIcon fontSize="large" />
          </IconButton>
        </Paper>
        <Button onClick={handleLogin} className={classes.loginButton} variant="contained" color="primary">
          Login
        </Button>
      </Paper>
    </form>
  );
}