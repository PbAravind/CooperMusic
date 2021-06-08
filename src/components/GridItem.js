import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PlaylistModal from './PlaylistModal';
import PurchaseAlbum from './PurchaseAlbum';

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
    textAlign: 'left',
    marginLeft: '1%',
    marginBottom: '1%'
  },
  paperContainer: {
    marginTop: '1%'
  }
}));

const GridItem = (props) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [purchaseOpen, setPurchaseOpen] = React.useState(false);
  const [item, setItem] = React.useState({});

  const handleModalClose = () => {
    setOpen(false);
  };

  const handlePurchaseClose = () => {
    setPurchaseOpen(false);
  }

  const handleItemClick = (type, item) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const multiDeviceSupport = (userInfo.subscription && userInfo.subscription.multiDeviceSupport) ? true : userInfo.loginDevice === (userInfo.subscription && userInfo.subscription.registeredDevice);
    console.log("UserInfo", item, multiDeviceSupport);
    if (item.name === 'Create Playlist') {
      console.log("OPEN PLAYLIST MODAL");
      setItem(item);
      setOpen(true);
    } else {
      if ((userInfo.subscription && userInfo.subscription.isActive && multiDeviceSupport) || (userInfo.albums && userInfo.albums.includes(item._id))) {
        props.history.push({
          pathname: "/song",
          state: {
            data: {
              type,
              id: item._id,
              songs: item.songs
            }
          }
        })
      }
      else {
        setItem(item);
        setPurchaseOpen(true);
      }
    }
  }

  return (
    <Paper className={classes.paperContainer} elevation={0} >
      <Typography variant="h6" className={`${classes.title} ${classes.cardTitle}`}>
        {props.title}
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        {props.items.length && props.items.map(v => {
          return (
            <Grid onClick={() => handleItemClick(props.type, v)} key={v.name} item xs={2}>
              <Paper elevation={0} >
                <img
                  alt={v.name}
                  style={{ borderRadius: '5px' }}
                  height={'auto'}
                  width={'55%'}
                  src={v.img ? `data:image/jpeg;base64,${v.img}` : v.defaultImg ? v.defaultImg : 'Music_default.png'}></img>
                <Typography>{v.name}</Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
      <PlaylistModal
        title={'Create a New Playlist'}
        item={item}
        open={open}
        handleModalClose={handleModalClose} />
      <PurchaseAlbum
        title={'Do not Have Access to Album'}
        item={item}
        open={purchaseOpen}
        handleModalClose={handlePurchaseClose} />
    </Paper>
  )
}

export default withRouter(GridItem)
