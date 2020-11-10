import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import GitHubIcon from '@material-ui/icons/GitHub';

import ArticleLeader from '../components/ArticleLeader';
import ArticleList from '../components/ArticleList';
import BaseCard from '../components/BaseCard';
import BaseImage from '../components/BaseImage';
import BaseListItem from '../components/BaseListItem';
import BaseMultiSelect from '../components/BaseMultiSelect';
import BaseSelect from '../components/BaseSelect';
import BaseSwitch from '../components/BaseSwitch';
import BaseTabs from '../components/BaseTabs';
import CallingCard from '../components/CallingCard';
import EventInfoBox from '../components/EventInfoBox';
import HonorBadgeGrid from '../components/HonorBadgeGrid';
import ImageUploadingBox from '../components/ImageUploadingBox';
import NoContentsBox from '../components/NoContentsBox';
import NotificationList from '../components/NotificationList';
import PageTitleBar from '../components/PageTitleBar';
import ProjectInfoBox from '../components/ProjectInfoBox';
import ProjectInfoCardGrid from '../components/ProjectInfoCardGrid';
import ResponsiveDialog from '../components/ResponsiveDialog';
import SectionBox from '../components/SectionBox';
import SectionTitleBar from '../components/SectionTitleBar';
import StatCounterBox from '../components/StatCounterBox';
import TaskInfoCardGrid from '../components/TaskInfoCardGrid';
import TeamInfoBox from '../components/TeamInfoBox';
import TeamInfoCardGrid from '../components/TeamInfoCardGrid';
import ThreadBox from '../components/ThreadBox';
import ThreadGrid from '../components/ThreadGrid';
import ThreadList from '../components/ThreadList';
import UserGroupInfoCard from '../components/UserGroupInfoCard';
import UserInfoBox from '../components/UserInfoBox';
import UserInfoCard from '../components/UserInfoCard';
import UserInfoCardGrid from '../components/UserInfoCardGrid';
import WorkInfoBox from '../components/WorkInfoBox';
import WorkInfoCardGrid from '../components/WorkInfoCardGrid';

/* ------------------------ Test data zone start ------------------------- */

/* const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27'; */


const COMP_OV_ICON = <GitHubIcon style={{ fontSize: 30 }} />;
const COMP_OV_IMAGE_ADDRESS = "/static/images/sample_1.jpg";



const ARTICLE_LEADER_ARTICLE = {
  id: 0,
  content: "Test article content",
  viewCount: 10,
  createdAt: "2020-09-01 00:00:00",
  modifiedAt: "2020-09-02 00:00:00",
  title: "Test article title",
  user: {
    id: 0,
    name: "Test user name",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  },
  parent: null,
  images: [
    {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  ],
};


const ARTICLE_LIST_ITEMS = [
  {
    id: 0,
    content: "Test article content 1",
    viewCount: 10,
    createdAt: "2020-09-01 00:00:00",
    modifiedAt: "2020-09-02 00:00:00",
    title: "Test article title",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    parent: null,
    images: [
      {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    ],
  },
  {
    id: 0,
    content: "Test article content 2",
    viewCount: 10,
    createdAt: "2020-09-01 00:00:00",
    modifiedAt: "2020-09-02 00:00:00",
    title: "Test article title",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    parent: null,
    images: [
      {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    ],
  },
];

const BASE_MULTI_SELECT_ITEMS = [
  {
    id: 0,
    label: "Position A",
    value: "a",
  },
  {
    id: 1,
    label: "Position B",
    value: "b",
  },
  {
    id: 2,
    label: "Position C",
    value: "c",
  },
  {
    id: 3,
    label: "Position D",
    value: "d",
  },
]

const BASE_SELECT_ITEMS = [
  {
    id: 0,
    label: "Position A",
    value: "a",
  },
  {
    id: 1,
    label: "Position B",
    value: "b",
  },
  {
    id: 2,
    label: "Position C",
    value: "c",
  },
  {
    id: 3,
    label: "Position D",
    value: "d",
  },
];

const BASE_TAB_TAB_PROPS = [
  {
    id: 0,
    label: "Following",
  },
  {
    id: 1,
    label: "Followers",
  },
];

const EVENT_INFO_BOX_EVENT = {
  id: 0,
  title: "Test event title",
  content: "Test event content",
  images: [
    {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  ],
  recruitingStart: "2020-09-01 00:00:00",
  recruitingEnd: "2020-09-02 00:00:00",
  eventStart: "2020-09-03 00:00:00",
  eventEnd: "2020-09-04 00:00:00",
};

const HONOR_BADGE_GRID_ITEMS = [
  {
    id: 0,
    name: "Test honor 1",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
    score: 100,
  },
  {
    id: 1,
    name: "Test honor 2",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
    score: 200,
  },
];

const NOTIFICATION_LIST_ITEMS = [
  {
    id: 0,
    title: "New Comments",
    content: "I don't think so",
    createdAt: "11/01 13:11",
    link: "/threads/904",
  },
  {
    id: 1,
    title: "New Comments",
    content: "I agree with you",
    createdAt: "11/02 15:23",
    link: "/threads/896",
  },
  {
    id: 2,
    title: "New Comments",
    content: "I don't know",
    createdAt: "11/04 18:37",
    link: "/threads/896",
    },
  {
    id: 3,
    title: "New Comments",
    content: "I don't know",
    createdAt: "11/05 11:52",
    link: "/threads/896",
    },
  {
    id: 4,
    title: "New Comments",
    content: "I don't know",
    createdAt: "11/06 7:26",
    link: "/threads/896",
  },
];


const PROJECT_INFO_BOX_PROJECT = {
  id: 0,
  name: "Test project",
  getUsers: [
    {
      id: 0,
      name: "Test user 1",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 1,
      name: "Test user 2",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 2,
      name: "Test user 3",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 3,
      name: "Test user 4",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
  ],
  event: {
    id: 0,
    title: "Test event title",
    content: "Test event content",
    images: [
      {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    ],
    recruitingStart: "2020-09-01 00:00:00",
    recruitingEnd: "2020-09-02 00:00:00",
    eventStart: "2020-09-03 00:00:00",
    eventEnd: "2020-09-04 00:00:00",
  },
  works: [
    {
      id: 0,
      name: "Test work 1",
      opened: true,
      order: 0,
    },
    {
      id: 1,
      name: "Test work 2",
      opened: true,
      order: 1,
    },
    {
      id: 2,
      name: "Test work 3",
      opened: false,
      order: 2,
    },
  ],
};

const TEAM_INFO_BOX_TEAM = {
  id: 0,
  name: "Test team",
  projects: [
    {
      id: 0,
      name: "Test project 1",
    },
    {
      id: 1,
      name: "Test project 2",
    },
    {
      id: 2,
      name: "Test project 3",
    },
  ],
  getUsers: [
    {
      id: 0,
      name: "Test user 1",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 1,
      name: "Test user 2",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 2,
      name: "Test user 3",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 3,
      name: "Test user 4",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
  ],
};


const THREAD_BOX_ARTICLE_LEADER = {
  id: 0,
  content: "Test article leader content",
  viewCount: 10,
  createdAt: "2020-09-01 00:00:00",
  modifiedAt: "2020-09-02 00:00:00",
  title: "Test article title",
  user: {
    id: 0,
    name: "Test user name",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  },
  parent: null,
  images: [
    {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  ],
};


const THREAD_BOX_ARTICLES = [
  {
    id: 0,
    content: "Test article content 1",
    viewCount: 10,
    createdAt: "2020-09-01 00:00:00",
    modifiedAt: "2020-09-02 00:00:00",
    title: "Test article title",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    parent: null,
    images: [
      {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    ],
  },
  {
    id: 0,
    content: "Test article content 2",
    viewCount: 10,
    createdAt: "2020-09-01 00:00:00",
    modifiedAt: "2020-09-02 00:00:00",
    title: "Test article title",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    parent: null,
    images: [
      {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    ],
  },
];

const THREAD_GRID_ITEMS = [
  {
    id: 0,
    name: "Test thread 1",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    team: null,
    event: null,
    firstArticle: {
      id: 0,
      content: "First article",
      viewCount: 10,
      createdAt: "2020-09-01 00:00:00",
      modifiedAt: "2020-09-02 00:00:00",
      title: "First article title",
      user: {
        id: 0,
        name: "Test user name",
        image: {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      },
      parent: null,
      images: [
        {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      ],
    },
    getArticles: {

    },
    upCount: 1,
    downCount: 2,
    starCount: 3,
    commentCount: 4,
  },
  {
    id: 0,
    name: "Test thread 2",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    team: null,
    event: null,
    firstArticle: {
      id: 0,
      content: "First article",
      viewCount: 10,
      createdAt: "2020-09-01 00:00:00",
      modifiedAt: "2020-09-02 00:00:00",
      title: "First article title",
      user: {
        id: 0,
        name: "Test user name",
        image: {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      },
      parent: null,
      images: [
        {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      ],
    },
    getArticles: {

    },
    upCount: 1,
    downCount: 2,
    starCount: 3,
    commentCount: 4,
  },
];

const THREAD_LIST_ITEMS = [
  {
    id: 0,
    name: "Test thread 1",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    team: null,
    event: null,
    firstArticle: {
      id: 0,
      content: "First article",
      viewCount: 10,
      createdAt: "2020-09-01 00:00:00",
      modifiedAt: "2020-09-02 00:00:00",
      title: "First article title",
      user: {
        id: 0,
        name: "Test user name",
        image: {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      },
      parent: null,
      images: [
        {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      ],
    },
    getArticles: {

    },
    upCount: 1,
    downCount: 2,
    starCount: 3,
    commentCount: 4,
  },
  {
    id: 0,
    name: "Test thread 2",
    user: {
      id: 0,
      name: "Test user name",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    team: null,
    event: null,
    firstArticle: {
      id: 0,
      content: "First article",
      viewCount: 10,
      createdAt: "2020-09-01 00:00:00",
      modifiedAt: "2020-09-02 00:00:00",
      title: "First article title",
      user: {
        id: 0,
        name: "Test user name",
        image: {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      },
      parent: null,
      images: [
        {
          id: 0,
          address: {COMP_OV_IMAGE_ADDRESS},
        },
      ],
    },
    getArticles: {

    },
    upCount: 1,
    downCount: 2,
    starCount: 3,
    commentCount: 4,
  },
];


const USER_GROUP_INFO_CARD_USERS = [
  {
    id: 0,
    name: "Test user 1",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  },
  {
    id: 0,
    name: "Test user 2",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  },
  {
    id: 0,
    name: "Test user 3",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  },
  {
    id: 0,
    name: "Test user 4",
    image: {
      id: 0,
      address: {COMP_OV_IMAGE_ADDRESS},
    },
  },
]



const USER_INFO_BOX_USER = {
  id: 0,
  oauth2Provider: "GITHUB",
  oauth2Id: "testoauth2id",
  name: "Test user 1",
  email: "Test email",
  biography: "Test biography",
  totalHonor: 1000,
  honors: [
    {
      honor: 10,
      position: {
        id: 0,
        name: "Test position 1",
      },
    },
    {
      honor: 20,
      position: {
        id: 0,
        name: "Test position 2",
      },
    },
  ],
  image: {
    id: 0,
    address: {COMP_OV_IMAGE_ADDRESS},
  },
  blog: null,
  getTeams: [
    {
      id: 0,
      name: "Test team 1",
    },
    {
      id: 1,
      name: "Test team 2",
    },
  ],
  getFollowings: [
    {
      id: 0,
      name: "Test following 1",
      email: "Test email",
      biography: "Test biography",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 1,
      name: "Test following 2",
      email: "Test email",
      biography: "Test biography",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
  ],
  getFollowers: [
    {
      id: 0,
      name: "Test follower 1",
      email: "Test email",
      biography: "Test biography",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
    {
      id: 1,
      name: "Test follower 2",
      email: "Test email",
      biography: "Test biography",
      image: {
        id: 0,
        address: {COMP_OV_IMAGE_ADDRESS},
      },
    },
  ],
};


const USER_INFO_CARD_USER = {
  id: 0,
  oauth2Provider: "GITHUB",
  oauth2Id: "testoauth2id",
  name: "Test user 1",
  email: "Test email",
  biography: "Test biography",
  totalHonor: 1000,
  honors: [
    {
      honor: 10,
      position: {
        id: 0,
        name: "Test position 1",
      },
    },
    {
      honor: 20,
      position: {
        id: 0,
        name: "Test position 2",
      },
    },
  ],
  image: {
    id: 0,
    address: {COMP_OV_IMAGE_ADDRESS},
  },
};

const WORK_INFO_BOX_WORK = {
  id: 0,
  name: "Test work",
  opened: true,
  tasks: [
    {
      id: 0,
      name: "Test work 1",
      difficurty: 1,
      order: 0,
      progress: {
        id: 0,
        name: "Test progress",
      },
      honors: [
        {
          honor: 10,
          position: {
            id: 0,
            name: "Test position",
          }
        }
      ]
    },
    {
      id: 1,
      name: "Test work 2",
      difficurty: 2,
      order: 1,
      progress: {
        id: 0,
        name: "Test progress",
      },
      honors: [
        {
          honor: 10,
          position: {
            id: 0,
            name: "Test position",
          }
        }
      ]
    },
    {
      id: 2,
      name: "Test work 3",
      difficurty: 3,
      order: 2,
      progress: {
        id: 0,
        name: "Test progress",
      },
      honors: [
        {
          honor: 10,
          position: {
            id: 0,
            name: "Test position",
          }
        }
      ]
    },
  ],
};

const WORK_INFO_BOX_WORK = {
  id: 0,
  name: "Test work",
  opened: true,
  tasks: [
    {
      id: 0,
      name: "Test work 1",
      difficurty: 1,
      order: 0,
      progress: {
        id: 0,
        name: "Test progress",
      },
      honors: [
        {
          honor: 10,
          position: {
            id: 0,
            name: "Test position",
          }
        }
      ]
    },
    {
      id: 1,
      name: "Test work 2",
      difficurty: 2,
      order: 1,
      progress: {
        id: 0,
        name: "Test progress",
      },
      honors: [
        {
          honor: 10,
          position: {
            id: 0,
            name: "Test position",
          }
        }
      ]
    },
    {
      id: 2,
      name: "Test work 3",
      difficurty: 3,
      order: 2,
      progress: {
        id: 0,
        name: "Test progress",
      },
      honors: [
        {
          honor: 10,
          position: {
            id: 0,
            name: "Test position",
          }
        }
      ]
    },
  ],
};


/* ------------------------- Test data zone end -------------------------- */


const useStyles = makeStyles(() => ({
  divider: {
    border: '0.1rem solid',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 5,
    margin: '2rem 0rem',
  },
  paper: {
    border: '0rem solid',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    margin: '2rem 0rem',
    padding: '1.5rem 1.5rem',
    variant: 'outlined',
  },
  pageTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 32,
    fontWeight: 400,
    margin: '0.5rem 0.5rem',
    wordWrap: "break-word",
  },
  paperTitleTypography: {
    fontFamily: "Ubuntu",
    fontSize: 28,
    fontWeight: 300,
    wordWrap: "break-word",
  },
}));

function Overview({ title, children }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography className={classes.paperTitleTypography} variant="h4" gutterBottom>
        {title}
      </Typography>
      <Divider className={classes.divider} />
      {children}
    </Paper>
  );
}

export default function ComponentOverview() {
  const classes = useStyles();
  const [baseSwitchState, setBaseSwitchState] = useState(false);
  const [baseSelectValue, setBaseSelectValue] = useState("");
  const toggleBaseSwitch = () => {
    setBaseSwitchState((prev) => !prev);
  };
  const refreshBaseSelect = (event) => {
    setBaseSelectValue(event.target.value);
  };


  return (
    <Container maxWidth="sm">


      <Typography className={classes.pageTitleTypography}>
        Basic components testing area
      </Typography>


      <Overview title="Button">
        <Button>Test label</Button>
      </Overview>




      <Typography className={classes.pageTitleTypography}>
        Custom components testing area
      </Typography>



      <Overview title="ArticleLeader">
        <ArticleLeader
          article={ARTICLE_LEADER_ARTICLE}
          like={3}
          topic="Test topic"
          view={4}
          vote={5}
        />
      </Overview>

      <Overview title="ArticleList">
        <ArticleList
          items={ARTICLE_LIST_ITEMS}
        />
      </Overview>

      <Overview title="BaseCard">
        <BaseCard
          image={COMP_OV_IMAGE_ADDRESS}
          imageTitle="Test image title"
          onClick={() => alert('onClick')}
        >
          <Typography>Test children</Typography>
        </BaseCard>
      </Overview>

      <Overview title="BaseImage">
        <BaseImage
          image={COMP_OV_IMAGE_ADDRESS}
          imageTitle="Test image title"
          onClick={() => alert('onClick')}
        />
      </Overview>

      <Overview title="BaseListItem">
        <BaseListItem
          primary="Test primary"
          secondary="Test secondary"
          avatar={COMP_OV_IMAGE_ADDRESS}
          onClick={() => alert('onClick')}
          circleIcon
          dense={false}
        />
      </Overview>

      <Overview title="BaseListItem - Dense">
        <BaseListItem
          primary="Test primary"
          secondary="Test secondary"
          icon={COMP_OV_IMAGE_ADDRESS}
          onClick={() => alert('onClick')}
          circleIcon
          dense
        />
      </Overview>

      <Overview title="BaseMultiSelect">
        <BaseMultiSelect
          items={BASE_MULTI_SELECT_ITEMS}
          label="Test Label"
          placeholder="Test Placeholder"
          onChange={refreshBaseSelect}
        />
      </Overview>


      <Overview title="BaseSelect">
        <BaseSelect
          label="Test label"
          items={BASE_SELECT_ITEMS}
          value={baseSelectValue}
          onChange={refreshBaseSelect}
        />
      </Overview>


      <Overview title="BaseSwitch">
        <BaseSwitch
          label="Test label"
          value={baseSwitchState}
          onChange={toggleBaseSwitch}
        />
        { baseSwitchState ?
          (
            <Typography>Activated</Typography>
          )
          : (
            <Typography>Deactivated</Typography>
          )
        }
      </Overview>

      <Overview title="BaseTabs">
        <BaseTabs tabProps={BASE_TAB_TAB_PROPS}>
          <Typography>Test children 1</Typography>
          <Typography>Test children 2</Typography>
        </BaseTabs>
      </Overview>

      <Overview title="CallingCard">
        <CallingCard image={COMP_OV_IMAGE_ADDRESS} onClick={() => alert('onClick')}>
          <Typography>Test children 1</Typography>
          <Typography>Test children 2</Typography>
        </CallingCard>
      </Overview>


      <Overview title="EventInfoBox">
        <EventInfoBox event={EVENT_INFO_BOX_EVENT} dense={false} />
      </Overview>

      <Overview title="EventInfoBox - Dense">
        <EventInfoBox event={EVENT_INFO_BOX_EVENT} dense />
      </Overview>

      <Overview title="HonorBadgeGrid">
        <HonorBadgeGrid items={HONOR_BADGE_GRID_ITEMS} dense />
      </Overview>

      <Overview title="ImageUploadingBox">
        <ImageUploadingBox image={COMP_OV_IMAGE_ADDRESS} />
      </Overview>

      <Overview title="NoContentsBox">
        <NoContentsBox />
      </Overview>

      <Overview title="NotificationList">
        <NotificationList items={NOTIFICATION_LIST_ITEMS} />
      </Overview>

      <Overview title="PageTitleBar">
        <PageTitleBar
          icon={COMP_OV_ICON}
          title="Test page title"
          circleIcon
        >
          <Typography>Test children</Typography>
        </PageTitleBar>
      </Overview>

      <Overview title="PageTitleBar - with BackButton">
        <PageTitleBar
          backButton
          title="Test page title"
          circleIcon
        >
          <Typography>Test children</Typography>
        </PageTitleBar>
      </Overview>

      <Overview title="ProjectInfoBox">
        <ProjectInfoBox project={PROJECT_INFO_BOX_PROJECT} />
      </Overview>

      <Overview title="ResponsiveDialog">
        <ResponsiveDialog />
      </Overview>

      <Overview title="SectionBox">
        <SectionBox>
          <Typography>Test children</Typography>
        </SectionBox>
      </Overview>

      <Overview title="SectionBox - with SectionTitleBar">
        <SectionBox
          titleBar={
            <SectionTitleBar title="Test title" icon={COMP_OV_ICON} />
            }
        >
          <Typography>Test children</Typography>
        </SectionBox>
      </Overview>

      <Overview title="SectionTitleBar">
        <SectionTitleBar
          icon={COMP_OV_ICON}
          title="Test page title"
          circleIcon
        >
          <Typography>Test children</Typography>
        </SectionTitleBar>
      </Overview>

      <Overview title="StatCounterBox">
        <StatCounterBox
          commentCount={1}
          image
          upCount={2}
          topic="Test topic"
          view={3}
          vote={4}
        />
      </Overview>

      <Overview title="StatCounterBox - Compact">
        <StatCounterBox
          commentCount={1}
          image
          upCount={2}
          topic="Test topic"
          view={3}
          vote={4}
          compact
        />
      </Overview>

      <Overview title="TeamInfoBox">
        <TeamInfoBox team={TEAM_INFO_BOX_TEAM} />
      </Overview>


      <Overview title="ThreadBox">
        <ThreadBox
          articleLeader={THREAD_BOX_ARTICLE_LEADER}
          articles={THREAD_BOX_ARTICLES}
          like={1}
          topic="Test topic"
          view={2}
          vote={3}
        />
      </Overview>

      <Overview title="ThreadGrid">
        <ThreadGrid
          items={THREAD_GRID_ITEMS}
          xs={6}
        />
      </Overview>

      <Overview title="ThreadList">
        <ThreadList
          items={THREAD_LIST_ITEMS}
        />
      </Overview>

      <Overview title="UserGroupInfoCard">
        <UserGroupInfoCard
          primary="Test primary"
          secondary="Test secondary"
          title="Test title"
          users={USER_GROUP_INFO_CARD_USERS}
          onClick={() => alert('onClick')}
        />
      </Overview>

      <Overview title="UserGroupInfoCard - with AddButton">
        <UserGroupInfoCard
          primary="Test primary"
          secondary="Test secondary"
          title="Test title"
          users={USER_GROUP_INFO_CARD_USERS}
          onClick={() => alert('onClick')}
          onAddButtonClick={() => alert('onClick - AddButton')}
        />
      </Overview>

      <Overview title="UserInfoBox">
        <UserInfoBox user={USER_INFO_BOX_USER} />
      </Overview>

      <Overview title="UserInfoCard">
        <UserInfoCard user={USER_INFO_CARD_USER} onClick={() => alert('onClick')} />
      </Overview>

      <Overview title="WorkInfoBox">
        <WorkInfoBox work={WORK_INFO_BOX_WORK} />
      </Overview>

    </Container>
  );
}

