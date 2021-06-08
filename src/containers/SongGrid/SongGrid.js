import React, { useEffect, useState } from "react";
import axios from 'axios';
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from '@material-ui/core/styles';
import AddSongModal from "../../components/AddSongModal";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './SongGrid.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridInfo: {
    marginLeft: '17%',
    marginTop: '2%'
  },
  gridTextContainer: {
    margin: '2%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  cardTitle: {
    textAlign: 'center',
    marginLeft: '1%',
    marginBottom: '1%'
  },
  paperContainer: {
    marginTop: '1%'
  }
}));

const SongGrid = (props) => {

  const columns = [
    { field: "id", hide: true },
    { field: "title", headerName: "TITLE", width: 200 },
    { field: "artist", headerName: "ARTIST", width: 200 },
    { field: "album", headerName: "ALBUM", width: 200 },
    { field: "genre", headerName: "GENRE", width: 200 },
    { field: "year", headerName: "YEAR", width: 200 }
  ];

  if (props.history.location.state.data.type !== 'playlist') {
    columns.push({
      field: '',
      headerName: '',
      width: '250',
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={openAddPlaylist}
            style={{ marginLeft: 16 }}
          >
            Add to Playlist
          </Button>
        </strong>
      ),
    })
  }

  const classes = useStyles();

  const [song, setSong] = useState({});
  const [rows, setRows] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [songUrl, setUrl] = useState('');
  const [songPayload, setPayload] = useState({});

  const handleSortModelChange = (params) => {
    if (params.sortModel !== sortModel) {
      setSortModel(params.sortModel);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const openAddPlaylist = () => {
    setOpen(true);
  }

  useEffect(() => {
    const id = props.history.location.state.data.id;
    const type = props.history.location.state.data.type;
    const songIds = props.history.location.state.data.songs;

    let { url, payload } = getUrlAndPayload(id, type, songIds);



    console.log("URL", url, payload);

    axios.post(url, payload).then(res => {
      console.log(res);
      const _rows = formatData(res.data);
      setRows(_rows);
      setSong(_rows[0]);
      setUrl(url);
      setPayload(payload);
    })
  }, []);

  useEffect(() => {
    let active = true;

    if (sortModel.length) {
      console.log("SORTMODAL", sortModel);

      const { field, sort } = sortModel[0];
      setLoading(true);
      axios.post(`${songUrl}?sortBy=${field}&dir=${sort}`, songPayload).then(res => {
        console.log(res);
        const _rows = formatData(res.data);
        setRows(_rows);
        setLoading(false);
      })
    }

    return () => {
      active = false;
    };
  }, [sortModel]);

  const getUrlAndPayload = (id, type, songIds) => {
    let isAlbum = false;
    let isPlaylist = false;
    let isSong = false;
    let url = '';
    let payload = {};

    switch (type) {
      case 'album': {
        isAlbum = true;
        url = `http://localhost:5000/api/songs/${id}`;
        payload = {
          isAlbum, isPlaylist, isSong
        }
        break;
      }
      case 'song': {
        isSong = true;
        url = `http://localhost:5000/api/songs/${id}`;
        payload = {
          isAlbum, isSong, isPlaylist
        };
        break;
      }
      case 'playlist': {
        isPlaylist = true;
        url = `http://localhost:5000/api/songs/${songIds}`;
        payload = {
          isAlbum, isSong, isPlaylist
        };
        break;
      }
      default: {
        payload = {}
      }
    }

    return { url, payload }

  }

  const formatData = (data) => {
    return data.map(v => {
      let obj = { ...v };
      obj.artist = v.artist.join(",");
      obj.albumInfo = v.album;
      obj.year = v.album.year;
      obj.album = v.album.name;
      obj.id = v._id;
      return obj
    })
  }

  const handleRowClick = (data) => {
    console.log("CLICKED ROW", data);
    setSong(data.row);
  }

  return (
    <Paper elevation={0}>
      {song && song.albumInfo && <Grid container className={`${classes.root} ${classes.gridInfo}`} spacing={1}>
        <Grid item xs={2}>
          <img
            alt={song.title}
            style={{ borderRadius: '10px' }}
            height={'auto'}
            width={'80%'}
            src={(song.albumInfo && song.albumInfo.img) ? `data:image/jpeg;base64,${song.albumInfo.img}` : 'Music_default.png'}>
          </img>
        </Grid>
        <Grid className={classes.gridTextContainer} item xs={2}>
          <Typography className={classes.cardTitle} variant='h6'>{song.albumInfo.name}</Typography>
          <Divider variant="middle" />
          <Typography className={classes.cardContent}>By {song.albumInfo.artist}</Typography>
          <Typography className={classes.cardContent}>Released on {song.albumInfo.year}</Typography>
        </Grid>
      </Grid>}
      <div style={{ height: 300, width: "65%", marginTop: '5%', marginLeft: '17%' }}>
        <DataGrid rows={rows} columns={columns} sortingMode="server" onSortModelChange={handleSortModelChange} onRowClick={handleRowClick} loading={loading} />
      </div>
      <AddSongModal
        title={'Add Song to your Playlist'}
        item={song}
        open={open}
        handleModalClose={handleModalClose} />
    </Paper>
  );
}

export default SongGrid