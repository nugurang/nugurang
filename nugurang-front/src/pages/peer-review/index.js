import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BaseMultiSelect from '../../components/BaseMultiSelect';

import Layout from '../../components/Layout';


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
`;

const GET_TEAMMATES = gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      getUsers(page: 0, pageSize: 100) {
        id
        name
        image {
          id
          address
        }
      }
    }
  }
}
}
`;

export const GET_CURRENT_USER = gql`
  query {
    currentUser {
      id
      name
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
    useQuery(GET_TEAMMATES, {variables: {id: router.query.project}}),
    useQuery(GET_CURRENT_USER)
  ]
  const errorResponse = responses.find((response) => response.error)

  if (errorResponse)
    return <GraphQlError error={errorResponse.error} />

  if (responses.some((response) => response.loading))
    return <Loading />;

  const Positions = responses[0].data.positions
  const users = responses[1].data.getProject ? responses[1].data.getProject.getUsers : null;
  const curUser = responses[2].data.currentUser;

  return (
    <Layout>
      <SectionTitleBar title="Peer review" backButton />
      {users.flat().map((item) => (
        item.id !== curUser.id
        ? (
          <SectionBox key={item.id} titleBar={<SectionTitleBar title={item.name} avatar={item.image.address} circleIcon="true" />}>
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
        : null
      ))}
      <Box align="center">
        <Button onClick={() => router.push('/peer-review/thank-you')}>Submit</Button>
      </Box>
    </Layout>
  );
}

export default withAuth(PeerReviewIndex);