import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert'
import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalComponent = (props) => {
  const [checked, setChecked] = React.useState(false);
  const alert = useAlert()

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubsciption = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let body = {
      userId: userInfo.userId,
      plan: props.item.plan,
      multiDeviceSupport: checked,
      loginDevice: userInfo.loginDevice
    }

    const sub = await axios.post('http://localhost:5000/api/subscribe', body);
    console.log("SUBSCRIPTION", sub);
    alert.show('You have successfully Subscribed');
    userInfo.subscription = sub.data;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    props.handleModalClose();
    props.history.push("/");
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleModalClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
      <DialogContent>
        <Typography>You are about to Subscribe to {props.item.plan} plan.</Typography>
        <Typography>Include Multiple Device Support <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} /></Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubsciption} color="primary">
          Pay {checked ? (props.item.price + props.item.multiDevicePrice) : props.item.price}
        </Button>
        <Button onClick={props.handleModalClose} color="primary">
          Cancel
          </Button>
      </DialogActions>
      {/* <Alert severity="success">This is a success alert ??? check it out!</Alert> */}
    </Dialog>
  );
}

export default withRouter(ModalComponent);