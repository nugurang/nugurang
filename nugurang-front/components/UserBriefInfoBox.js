import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  avatar: {
    fontSize: 36,
    height: '75px', 
    margin: '0px',
    width: '75px'
  },
  box: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '5px',
    padding: '0px',
    variant: 'outlined',
  },
  nameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 400,
    margin: '0px',
  },
  statisticsTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    margin: '0px',
  },
});


function UserBriefInfoBox(props) {

  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.box}>
        <Grid container spacing={2} alignItems="center" direction="row" justify="flex-start">
          <Grid item align="center">
            <Avatar
              className={classes.avatar}
              alt={props.user.name}
              src={props.user.image}
            />
          </Grid>
          <Grid item align="left">
            <Typography className={classes.nameTypography}>{props.user.name}</Typography>
            <Typography className={classes.statisticsTypography}>{props.user.statistics}</Typography>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

UserBriefInfoBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserBriefInfoBox);