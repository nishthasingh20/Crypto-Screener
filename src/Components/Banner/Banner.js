import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  banner : {
    backgroundImage: "url(./bg_image3.jpg)",
  },
  bannerContent: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
  },
  tagline: {
    height: "40%",
    display: 'flex',
    flexDirection: 'column',
    marginTop: 0,
    padding: 25,
    textAlign: "center",
    }
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography 
              variant='h2'
              style={{
                fontWeight: 'bold',
                marginBottom: 15,
                fontFamily: 'Bitter',
              }}
            >
              CryptoPulse
            </Typography>
            <Typography 
              variant="subtitle2"
              style={{
                color: "darkgray",
                textTransform: "capitalize",
                fontFamily: 'Bitter',
              }}
              >
                Get the latest information of your favorite Cryptocurrency
              </Typography>
          </div>
        </Container>
    </div>
  )
}

export default Banner