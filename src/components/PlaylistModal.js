import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlaylistModal = (props) => {
  //const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [playlistName, setName] = React.useState('');

  const handleChange = (event, set) => {
    set(event.target.value);
  };

  const handleCreatePlaylist = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const res = await axios.post('http://localhost:5000/api/playlist', { userId: userInfo.userId, playlistName })
    console.log(res);
    userInfo.playlists = [...userInfo.playlists, res.data]
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
        <Typography style={{ marginBottom: '10px' }}>Enter Playlist Name</Typography>
        <TextField id="playlistName" label="Playlist Name" value={playlistName} onChange={e => handleChange(e, setName)} variant="outlined" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreatePlaylist} color="primary">
          Create Playlist
        </Button>
        <Button onClick={props.handleModalClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withRouter(PlaylistModal);