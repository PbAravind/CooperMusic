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

const PurchaseAlbum = (props) => {
  const alert = useAlert();

  const handlePurchaseAlbum = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let body = {
      userId: userInfo.userId,
      albumId: props.item._id
    }


    const album = await axios.post('http://localhost:5000/api/purchaseAlbum', body);
    console.log("SUBSCRIPTION", album);
    alert.show('You have successfully Purchased the Album');
    userInfo.albums = album.data.album;
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
        <Typography>You do not own this Album. Please subscribe or Buy this album</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePurchaseAlbum} color="primary">
          Pay {props.item.price}
        </Button>
        <Button onClick={props.handleModalClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
      {/* <Alert severity="success">This is a success alert — check it out!</Alert> */}
    </Dialog>
  );
}

export default withRouter(PurchaseAlbum);