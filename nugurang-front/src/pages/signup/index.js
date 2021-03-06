import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import EmailIcon from '@material-ui/icons/Email';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';


export const CURRENT_OAUTH2_USER = gql`
  query {
    currentOAuth2User {
      id
      name
      email
    }
  }
`;

export const CREATE_IMAGE = gql`
  mutation createImage($address: String! ) {
    createImage (address: $address) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser (user: $user) {
      id
    }
  }
`;

function SignUp() {
  const router = useRouter();
  const newName = useRef(null);
  const newEmail = useRef(null);
  const newImageAddress = useRef(null);

  const results = [
    [null, useQuery(CURRENT_OAUTH2_USER)],
    useMutation(CREATE_IMAGE),
    useMutation(CREATE_USER)
  ];
  const user = results[0][1].data ? results[0][1].data.currentOAuth2User : null;
  const [getCurrentOAuth2User, createImage, createUser] = results.map(result => result[0]);

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleNewNameChange() {
    newName.current.focus();
  }

  function handleNewEmailChange() {
    newEmail.current.focus();
  }

  function handleNewImageAddressChange() {
    newImageAddress.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Sign up" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add username" icon=<PersonIcon /> />} border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={user.name}
                  inputRef={newName}
                  label="Enter username"
                  variant="outlined"
                  onClick={handleNewNameChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Add email" icon=<EmailIcon /> />} border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  defaultValue={user.email}
                  inputRef={newEmail}
                  label="Enter email"
                  variant="outlined"
                  onClick={handleNewEmailChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Add user image link" icon=<ImageIcon /> />} border={false}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={newImageAddress}
                  label="Enter image link"
                  variant="outlined"
                  onClick={handleNewImageAddressChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let image;
            if (newImageAddress.current.value) {
              const res = await createImage({ variables: { address: newImageAddress.current.value }});
              image = res.data.createImage.id;
            }
            await createUser({ variables: { user: { name: newName.current.value, email: newEmail.current.value, biography: "", image }}});
            router.push(`/signup/welcome`);
          }}
        >
          <Box align="center">
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </form>
      </Container>

    </Layout>
  );
}

export default SignUp;
