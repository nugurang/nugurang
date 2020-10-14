import Link from 'next/link'
import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignmentIcon from '@material-ui/icons/Assignment';

import ArticleBox from '../components/ArticleBox';
import ArticleBoxWithAccordion from '../components/ArticleBoxWithAccordion';
import ArticleDenseListWithLikeComment from '../components/ArticleDenseListWithLikeComment';
import ArticleGridWithLikeComment from '../components/ArticleGridWithLikeComment';
import ArticleListWithLikeComment from '../components/ArticleListWithLikeComment';
import CardGrid from '../components/CardGrid';
import ChattingBox from '../components/ChattingBox';
import CommentList from '../components/CommentList';
import ContentPaper from '../components/ContentPaper';
import PageTitleBox from '../components/PageTitleBox';
import PageTitleBoxWithoutBackButton from '../components/PageTitleBoxWithoutBackButton';
import ScrollableTabs from '../components/ScrollableTabs';
import SectionTitleBox from '../components/SectionTitleBox';
import SectionTitleBoxWithButton from '../components/SectionTitleBoxWithButton';
import SectionTitleBoxWithTextField from '../components/SectionTitleBoxWithTextField';
import UniversalButton from '../components/UniversalButton';
import UniversalList from '../components/UniversalList';
import UserBriefInfoBox from '../components/UserBriefInfoBox';
import UserGroupCard from '../components/UserGroupCard';
import UserInfoBox from '../components/UserInfoBox';

/* ---------------------------- Test data ------------------------ */

const articleTest = {
  id: 1,
  title: "Article 1",
  content: "Content 1",
  like: 1,
  comment: 3,
  image: "/static/images/sample_1.jpg",
  chip: <Chip label="Basic1" />,
};


const articlesTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    like: 1,
    comment: 3,
    image: "/static/images/sample_1.jpg",
    chip: <Chip label="Basic1" />,
  },
  {
    id: 2,
    title: "Article 2 with no images",
    content: "Content 2",
    like: 4,
    comment: 2,
    chip: <Chip label="Basic2" />,
  },
  {
    id: 3,
    title: "Article 3 with no chips",
    content: "Content 3",
    like: 9,
    image: "/static/images/sample_3.jpg",
    comment: 1,
  }
];



const cardsTest = [
  {
    id: 1,
    title: "Article 1",
    content: "Content 1",
    image: "/static/images/sample_1.jpg",
  },
  {
    id: 2,
    title: "Article 2",
    content: "Content 2",
    image: "/static/images/sample_2.jpg",
  },
  {
    id: 3,
    title: "Article 3",
    content: "Content 3",
    image: "/static/images/sample_3.jpg",
  }
];


const chatsTest = [
  {
    id: 1,
    name: "User 1",
    content: "Chat messaage 1",
    isMyChat: false,
    image: "/static/images/sample_1.jpg",
  },
  {
    id: 2,
    name: "User 2",
    content: "Chat message 2",
    isMyChat: true,
    image: "/static/images/sample_2.jpg",
  },
  {
    id: 3,
    name: "User 3",
    content: "Chat message 3",
    isMyChat: false,
    image: "/static/images/sample_3.jpg",
  },
  {
    id: 4,
    name: "User 4",
    content: "Chat message 4",
    isMyChat: true,
    image: "/static/images/sample_4.jpg",
  },
  {
    id: 5,
    name: "User 5",
    content: "Chat message 5",
    isMyChat: false,
    image: "/static/images/sample_5.jpg",
  },
  {
    id: 6,
    name: "User 6",
    content: "Chat message 6",
    isMyChat: true,
    image: "/static/images/sample_6.jpg",
  },
  {
    id: 7,
    name: "User 7",
    content: "Chat message 7",
    isMyChat: false,
    image: "/static/images/sample_7.jpg",
  },
  {
    id: 8,
    name: "User 8",
    content: "Chat message 8",
    isMyChat: true,
    image: "/static/images/sample_8.jpg",
  },
  {
    id: 9,
    name: "User 9",
    content: "Quite a long chat message. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    isMyChat: false,
    image: "/static/images/sample_9.jpg",
  },
];



const commentsTest = [
  {
    id: 1,
    author: "Author 1",
    content: "Comment 1",
  },
  {
    id: 2,
    author: "Author 2",
    content: "Comment 2",
  },
  {
    id: 3,
    author: "Author 3",
    content: "Comment 3",
  },
  {
    id: 4,
    author: "Author 4",
    content: "Quite a long comment. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
  }
];


let labelTest = "UniversalButton";



const listTest = [
  {
    id: 1,
    primary: "Primary text 1",
    secondary: "Secondary text 1",
    icon: "/static/images/sample_1.jpg",
  },
  {
    id: 2,
    primary: "Primary text 2 without icon",
    secondary: "Secondary text 2",
  },
  {
    id: 3,
    primary: "Primary text 3, no secondary text",
    icon: "/static/images/sample_3.jpg",
    secondary: null,
  },
  {
    id: 4,
    primary: "Primary text 4",
    secondary: "Quite a long secondary text. 1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    icon: "/static/images/sample_4.jpg",
  }
];


const tabsTest = [
  {
    id: 1,
    title: "Tab 1",
  },
  {
    id: 2,
    title: "Tab 2",
  },
  {
    id: 3,
    title: "Tab 3",
  }
];


let titleTest = 'Back';





const userTest = {
  id: 1,
  name: "Username",
  image: "/static/favicon/sample_1.jpg",
  followers: 10,
  followings: 20,
  bio: "Bio"
}



const userGroupTest = {
  id: 1,
  title: "Article 1",
  content: "Article 1 content",
  image: "/static/images/sample_1.jpg",
  users:[
    {
      id: 1,
      name: "User 1",
      image: "/static/images/sample_2.jpg",
      followers: 10,
      followings: 20,
      bio: "Bio"
    },
    {
      id: 2,
      name: "User 2",
      image: "/static/images/sample_3.jpg",
      followers: 10,
      followings: 20,
      bio: "Bio"
    },
    {
      id: 3,
      name: "User 3",
      image: "/static/images/sample_4.jpg",
      followers: 10,
      followings: 20,
      bio: "Bio"
    },
  ]
};



/* -------------------------- Test data end ---------------------- */


const styles = theme => ({
  paper: {
    border: '0px solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '50px 20px',
    padding: '0px',
    variant: 'outlined',
  },
  pageTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 36,
    fontWeight: 300,
  },
  componentNameTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
  },
});


function TestComp(props) {

    const { classes } = props

    return (
      <React.Fragment>


        <Container maxWidth="sm" >

          <CssBaseline />
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.pageTitleTypography} variant="h4" gutterBottom>
    	        Componetes testing area
    	      </Typography>
    	    </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ArticleBox
            </Typography>
            <ArticleBox article={articleTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ArticleBoxWithAccordion
            </Typography>
            <ArticleBoxWithAccordion article={articleTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ArticleDenseListWithLikeComment
            </Typography>
            <ArticleDenseListWithLikeComment articles={articlesTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ArticleGridWithLikeComment
            </Typography>
              <ArticleGridWithLikeComment articles={articlesTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ArticleListWithLikeComment
            </Typography>
              <ArticleListWithLikeComment articles={articlesTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              CardGrid
            </Typography>
              <CardGrid cards={cardsTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ChattingBox
            </Typography>
              <ChattingBox chats={chatsTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              CommentList
            </Typography>
            <CommentList comments={commentsTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ContentPaper
            </Typography>
            <ContentPaper />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              PageTitleBox
            </Typography>
            <PageTitleBox title={titleTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ContentPaper
            </Typography>
            <ContentPaper />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              PageTitleBoxWithoutBackButton
            </Typography>
            <PageTitleBoxWithoutBackButton title={titleTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              ScrollableTabs
            </Typography>
            <ScrollableTabs tabs={tabsTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              SectionTitleBox
            </Typography>
            <SectionTitleBox title={titleTest} icon={<AssignmentIcon />} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              SectionTitleBoxWithButton
            </Typography>
            <SectionTitleBoxWithButton title={titleTest} label={labelTest} icon={<AssignmentIcon />} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              SectionTitleBoxWithTextField
            </Typography>
            <SectionTitleBoxWithTextField title={titleTest} icon={<AssignmentIcon />} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              UniversalButton
            </Typography>
            <UniversalButton label={labelTest}/>
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              UniversalList
            </Typography>
            <UniversalList list={listTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              UserBriefInfoBox
            </Typography>
            <UserBriefInfoBox user={userTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              UserGroupCard
            </Typography>
          <UserGroupCard userGroup={userGroupTest} />
          </Paper>

          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.componentNameTypography} variant="h4" gutterBottom>
              UserInfoBox
            </Typography>
          <UserInfoBox user={userTest} />
          </Paper>


        </Container>

      </React.Fragment>
    );
}

TestComp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestComp);