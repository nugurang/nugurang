import React, { useRef } from 'react'
import { useRouter } from 'next/router';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import SearchIcon from '@material-ui/icons/Search';

import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox'
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import UserInfoCardGrid from '../../components/UserInfoCardGrid'
import withAuth from '../../components/withAuth';


export const GET_USER_BY_NAME = gql`
  query getUserByName($name: String!) {
    getUserByName(name: $name) {
      id
      name
      email
      image {
        id
        address
      }
      biography
      getFollowers(page:0, pageSize:100) {
        id
      }
      getFollowings(page:0, pageSize:100) {
        id
      }
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation updateTeam($team: ID!, $name: String!, $users: [ID]!) {
    updateTeam(team: $team, name: $name, users: $users) {
      team {
        id
      }
    }
  }
`;


function InviteUserToTeam() {
  const router = useRouter();
  const keywordName = useRef(null);

  const results = [useLazyQuery(GET_USER_BY_NAME), useMutation(UPDATE_TEAM)];
  const [getUserByName, updateTeam] = results.map(result => result[0]);

  const userData = results[0][1].data;
  const users = userData && userData.getUserByName ? [userData.getUserByName] : null;

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleKeywordNameChange() {
    keywordName.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Invite user" backButton />
      <SectionBox border={false}>
        <Grid container spacing={2} alignItems="center" justify="space-between">
          <Grid item xs>
            <FormControl fullWidth variant="filled">
              <TextField
                inputRef={keywordName}
                label="Enter username"
                variant="outlined"
                onClick={handleKeywordNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await getUserByName({ variables: {name: keywordName.current.value}})}}
            >
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </form>
          </Grid>
        </Grid>
      </SectionBox>

      <SectionBox
        titleBar={
          <SectionTitleBar title="Result" icon=<FindInPageIcon /> />
        }
      >
        {
          users
          ? (
            <SectionBox>
              <UserInfoCardGrid items={users} link="/user" xs={12} sm={6} md={4} />
            </SectionBox>
          )
          : <NoContentsBox />
        }
      </SectionBox>
    </Layout>
  );
}

export default withAuth(InviteUserToTeam);