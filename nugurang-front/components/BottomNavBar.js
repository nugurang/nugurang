import { withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/QuestionAnswer';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import TeaIcon from '@material-ui/icons/EmojiFoodBeverage';

const styles = {
  root: {
    top: 'auto',
    bottom: 0,
  },
  bottomNavigationAction: {
    color: "black",
    "&.Mui-selected": {
      color: "#9778ec",
    },
  }
};

function BottomNavBar(props) {
  const router = useRouter();
  const { classes } = props;
  let key = 0;
  const actions = [
    ['Home', 'home', <HomeIcon />],
    ['Boards', 'boards', <TeaIcon />],
    ['Teams', 'teams', <GroupIcon />],
    ['Chats', 'chats', <ChatIcon />],
    ['More', 'more', <MoreIcon />]
  ].map(([label, value, icon]) => {
      return (
        <BottomNavigationAction
          className={classes.bottomNavigationAction}
          key={++key}
          label={label}
          value={value}
          icon={icon}
          onClick={() => {router.push(`/${value}`)}}
        />
      )
  });
  return (
    <AppBar className={classes.root}>
      <BottomNavigation
        className={classes.root}
        value={router.pathname.split('/')[1] || 'home'}
      >
        {actions}
      </BottomNavigation>
    </AppBar>
  );
}

BottomNavBar.propTypes = {

};

export default withStyles(styles)(BottomNavBar);
