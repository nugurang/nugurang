import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import withAuth from '../../components/withAuth';
import BaseSwitch from '../../components/BaseSwitch';
import BaseTabs from '../../components/BaseTabs';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import ProjectInfoCard from '../../components/ProjectInfoCard';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import TeamInfoBox from '../../components/TeamInfoBox';
import UserInfoCard from '../../components/UserInfoCard';
import YesNoDialog from '../../components/YesNoDialog';


const TAB_PROPS = [
  {
    id: 0,
    label: "Projects",
  },
  {
    id: 1,
    label: "Teammates",
  },
]

const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      projects {
        id
        name
        getUsers(page: 0, pageSize: 100) {
          id
          name
          image {
            id
            address
          }
        }
        finished
      }
      owner {
        id
        name
        email
        image {
          id
          address
        }
      }
      getMembers(page: 0, pageSize: 100) {
        id
        name
        email
        image {
          id
          address
        }
      }
    }
  }
`;

const DELETE_TEAM = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`;


function TeamInfo() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFinished, setShowFinished] = useState(false);
  const toggleShowFinished = () => {
    setShowFinished((prev) => !prev);
  };

  const responses = [
    useQuery(GET_TEAM, {variables: {id: router.query.id}}),
  ];
  const errorResponse = responses.find((response) => response.error)
  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />
  if (responses.some((response) => response.loading))
    return <Loading />;
  const team = responses[0].data?.getTeam;
  const projects = showFinished ? team.projects : team.projects.filter(project => !project.finished);

  team.projects.forEach(function(project){
    project.onClick = () => router.push(`/projects/${project.id}`);
  });
  team.owner.onClick = () => router.push(`/user/${team.owner.id}`);
  team.getMembers.forEach(function(user){
    user.onClick = () => router.push(`/user/${user.id}`);
  });


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Layout>

      <PageTitleBar title="Team info" backButton="true" backButtonLink="/teams">
        <Button variant="" onClick={() => router.push({pathname: "/projects/create", query: { team: router.query.id }})}>
          <AddIcon />
          Project
        </Button>
        <Button variant="" onClick={handleClick}>
          <MoreVertIcon />
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => router.push({pathname: "/teams/update", query: { team: router.query.id }})}>
            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
            <Typography variant="inherit" noWrap>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <YesNoDialog
              title="Delete"
              content="Are you sure to delete?"
              onClickYes={async (e) => {
                e.preventDefault();
                await deleteTeam({ variables: { id: router.query.id }});
                router.push(`/teams`);
              }}
            >
              <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
              <Typography variant="inherit" noWrap>Delete</Typography>
            </YesNoDialog>
          </MenuItem>
        </Menu>
      </PageTitleBar>

      <Container maxWidth="md">
        <SectionBox border={false}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={12}>
              <TeamInfoBox team={team} />
            </Grid>
          </Grid>
        </SectionBox>

        <Box display="flex" justifyContent="flex-end">
          <Box mx="2rem"><BaseSwitch label="Show finished projects" checked={showFinished} onChange={toggleShowFinished} /></Box>
        </Box>
        <SectionBox>
          <BaseTabs tabProps={TAB_PROPS}>
            {
              projects && (projects.length)
              ? <Grid container>{projects.flat().map((project) => <Grid item xs={12} sm={6}><ProjectInfoCard project={project} /></Grid>)}</Grid>
              : <NoContentsBox />
            }
            {
              <>
                <Typography variant="h6">Owner</Typography>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <UserInfoCard user={team.owner} />
                  </Grid>
                </Grid>
                <Divider style={{margin: "1rem"}}/>
                <Typography variant="h6">Members</Typography>
                {
                  team.getMembers && (team.getMembers.length)
                  ? <Grid container>{team.getMembers.flat().map((user) => <Grid item xs={12} sm={6}><UserInfoCard user={user} /></Grid>)}</Grid>
                  : <NoContentsBox />
                }
              </>
            }
          </BaseTabs>
        </SectionBox>
      </Container>

    </Layout>
  );
}

export default withAuth(TeamInfo);