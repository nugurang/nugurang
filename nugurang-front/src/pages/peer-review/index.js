import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../../components/Layout';

import BaseMultiSelect from '../../components/BaseMultiSelect';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';

import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import withAuth from '../../components/withAuth';

const GET_POSITIONS = gql`
  query getPostion{
    positions{
      id
      name
    }
  }
`

const GET_TEAMMATES = gql`
  query {
    currentUser {
      id
      getTeams(page: 0, pageSize: 100) {
        id
        name
        getUsers(page: 0, pageSize: 100) {
          id
          image {
            id
            address
          }
        }
      }
    }
  }
`;

const TEST_POSITION_LIST = [
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



const TEST_USER_LIST = [
  {
    id: 0,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_1.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 1,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_2.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 2,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_3.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
  {
    id: 3,
    name: "Test User",
    email: "Test email",
    image: "/static/images/sample_4.jpg",
    bio: "Test bio",
    followers: 5,
    followings: 10,
  },
]




function PeerReviewIndex() {
  const router = useRouter();
  const responses = [
    useQuery(GET_POSITIONS),
    useQuery(GET_TEAMMATES),
  ]
  const errorResponse = responses.find((response) => response.error)

  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const Positions = responses[0].data.positions
  const users = responses[1].data.currentUser.getTeams ? responses[1].data.currentUser.getTeams[0].getUsers : null;

  return (
    <Layout>
      <SectionTitleBar title="Peer review" backButton />
      {users.flat().map((item) => (
        <SectionBox key={item.id} titleBar={<SectionTitleBar title={item.name} avatar={item.image} circleIcon="true" />}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Did very well of...</Typography>
              <BaseMultiSelect
                items={Positions}
                label="Position"
                placeholder="Select position"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Needs to go the extra mile to...</Typography>
              <BaseMultiSelect
                items={Positions}
                label="Position"
                placeholder="Select position"
              />
            </Grid>
          </Grid>
        </SectionBox>
        )
      )}
      <Box align="center">
        <Button onClick={() => router.push('/peer-review/thank-you')}>Submit</Button>
      </Box>
    </Layout>
  );
}

export default withAuth(PeerReviewIndex);