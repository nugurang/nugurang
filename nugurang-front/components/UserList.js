import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  avatar: {
    fontSize: 20,
    height: '2.5rem',
    width: '2.5rem'
  },
  box: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0.5rem',
    padding: '1.5rem',
    variant: 'outlined',
  },
  button: {
    background: '#FEFEFE',
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    color: 'default',
    margin: '1rem',
    padding: '1rem 3rem',
    variant: 'outlined',
  },
  buttonTypography: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  card: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '0rem',
    padding: '0rem',
    variant: 'outlined',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 24,
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  cardPrimaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 18,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  cardSecondaryTypography: {
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },
  iconButton: {
    backgroundColor: "transparent",
    color: "black",
    fontSize: 36,
    height: '2rem',
    width: '2rem'
  },
}));


export default function UserList({ items }) {
  const classes = useStyles();
  return (
    <List>
      {[items].flat().map((item) => (
        <ListItem key={item.id} alignItems="flex-start" button onClick={item.onClick}>
          <Grid container spacing={2} alignItems="flex-start" direction="row" justify="flex-start">
            <Grid item justify="flex-start">
              <Avatar className={classes.avatar}
                alt={item.name}
                src={item.image}
                variant="circle"
              />
            </Grid>
            <Grid item xs justify="flex-start">
              <Typography className={classes.cardTitleTypography}>
                {item.name}
              </Typography>
              <Box display={item.email ? "block" : "none"}>
                <Typography className={classes.cardPrimaryTypography}>
                  {item.email}
                </Typography>
              </Box>
              <Box display={item.bio ? "block" : "none"}>
                <Typography className={classes.cardSecondaryTypography}>
                  {item.bio}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ListItem>
))}
    </List>
  );
}