import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddSongModal = (props) => {

  const classes = useStyles();
  const [playlistName, setName] = useState('');
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setPlaylist(userInfo.playlists);
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleUpdatePlaylist = async () => {
    const selectedPlaylist = playlists.find(v => v.name === playlistName);
    const { _id, songs } = selectedPlaylist;
    console.log("Playlist", selectedPlaylist, props.item.id);
    const res = await axios.put(`http://localhost:5000/api/playlist/${_id}`, { songs: [...songs, props.item.id] });
    console.log(res);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // selectedPlaylist.songs = [...songs, props.item.id];
    let otherPlaylists = playlists.filter(v => v.name !== playlistName)
    userInfo.playlists = [...otherPlaylists, res.data];
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log(res);

    props.handleModalClose();
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
        <Typography style={{ marginBottom: '10px' }}>Choose Playlist</Typography>
        <Paper elevation={0} className={classes.formControl}>
          <Select
            style={{ width: '80%' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={playlistName}
            onChange={handleChange}
          >
            {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
            {playlists && playlists.map(v => <MenuItem value={v.name}>{v.name}</MenuItem>)}
          </Select>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdatePlaylist} color="primary">
          Add Song
        </Button>
        <Button onClick={props.handleModalClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSongModal