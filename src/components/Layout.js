import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomePage from '../containers/HomePage/HomePage';
import IconButton from '@material-ui/core/IconButton';
import Subscription from '../containers/Subscription/Subscription';
import SongGrid from '../containers/SongGrid/SongGrid';
import Login from '../containers/Login/Login'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: 1000
  },
  cardTitle: {
    textAlign: 'left'
  }
}));

const Layout = (props) => {

  const classes = useStyles();

  // useEffect(() => {
  //   props.history.push("/login");
  // }, [])

  const goToSubscription = () => {
    props.history.push("/subscribe");
  }

  const gotoHome = () => {
    props.history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <IconButton aria-label="show 4 new mails" color="inherit">
            <HomeRoundedIcon onClick={gotoHome} fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            COOP MUSIC
          </Typography>
          <Button onClick={goToSubscription} color="inherit">Buy Plans</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/subscribe" component={Subscription} />
        <Route path="/song" component={SongGrid} />
      </Switch>
    </div>
  );
}

export default withRouter(Layout);