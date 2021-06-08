import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../../components/GridItem'
import useGlobal from '../../store/index';

//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  cardTitle: {
    textAlign: 'left'
  }
}));

const HomePage = (props) => {

  const classes = useStyles();

  const createPlaylist = {
    name: 'Create Playlist', defaultImg: 'plus-circle1.png'
  };

  const [album, setAlbum] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [song, setSong] = useState([]);
  const [state, ] = useGlobal();

  const formatSongData = (data) => {
    return data.map(v => {
      let obj = {};
      obj._id = v._id;
      obj.name = v.title;
      obj.img = v.album.img;
      return obj
    })
  }

  console.log("STATEEEEEEEE",state);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    Promise.all([
      axios.get('http://localhost:5000/api/albums'),
      axios.get(`http://localhost:5000/api/playlist/${userInfo.userId}`),
      axios.get('http://localhost:5000/api/songs')])
      .then(res => {
        console.log("RESPONSE", res);
        setAlbum(res[0].data);
        setPlaylist([...res[1].data, createPlaylist]);
        const _songs = formatSongData(res[2].data);
        setSong(_songs);
      })
    axios.get('http://localhost:5000/api/albums').then(res => {
      console.log(res);
      setAlbum(res.data);
    })
    // return () => {
    //   setPlaylist([{
    //     name: 'Create Playlist', defaultImg: 'plus-circle1.png'
    //   }])
    // }
  }, [props])

  return (
    <div className={classes.root}>
      <GridItem type='album' title={'BROWSE ALBUMS'} items={album} />
      <GridItem type='playlist' title={'BROWSE PLAYLISTS'} items={playlist} />
      <GridItem type='song' title={'BROWSE SONGS'} items={song} />
    </div>
  );
}

export default HomePage