import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ModalComponent from '../../components/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: '3%',
    fontWeight: 1000,
  },
  layout: {
    margin: '10%'
  },
  cardTitle: {
    fontWeight: 1000,
    padding: '5%'
  },
  cardContent: {
    padding: '3%'
  },
  cardActions: {
    margin: '3%'
  }
}));

const Subscription = () => {

  const classes = useStyles();

  const [plan, setPlan] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/plans').then(res => {
      console.log(res);
      setPlan(res.data)
    })
  }, []);

  const purchasePlan = (item) => {
    setSelectedPlan(item)
    setOpen(true);
  }

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Paper className={classes.layout} elevation={0}>
        <Typography className={classes.title} variant='h6'>Pick Your Plan</Typography>
        <Grid container className={classes.root} spacing={2}>
          {plan.length && plan.map(v => {
            return (
              <Grid key={v.plan} item xs={3}>
                <Paper elevation={3}>
                  <Typography className={classes.cardTitle} variant='h6'>{v.plan}</Typography>
                  <Divider variant="middle" />
                  <Typography className={classes.cardContent}>Pay Rs.{v.price} and get access to all content for a period of {v.period} days</Typography>
                  <Typography className={classes.cardContent}>Get support for multiple devices at just Rs.{v.multiDevicePrice}</Typography>
                  <Button className={classes.cardActions} onClick={() => purchasePlan(v)} variant="contained" color="primary">Get Plan</Button>
                  <ModalComponent
                    title={'Payment Confimration'}
                    content={''}
                    item={selectedPlan}
                    open={open}
                    handleModalClose={handleModalClose} />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </div>
  )
}

export default Subscription
