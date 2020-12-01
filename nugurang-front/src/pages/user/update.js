import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import ImageIcon from '@material-ui/icons/Image';
import PersonIcon from '@material-ui/icons/Person';

import withAuth from '../../components/withAuth';
import BaseTabs from '../../components/BaseTabs';
import Layout from '../../components/Layout';
import OKDialog from '../../components/OKDialog';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';

const TAB_PROPS = [
  {
    id: 0,
    label: "Profile",
  },
  {
    id: 1,
    label: "Security",
  },
]

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      name
      email
      image {
        id
        address
      }
    }
  }
`;

export const CREATE_IMAGE = gql`
  mutation createImage($address: String!) {
    createImage (address: $address) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: UserInput!) {
    updateUser (user: $user) {
      id
    }
  }
`;


function Update() {
  const router = useRouter();
  const newName = useRef(null);
  const newEmail = useRef(null);
  const newImageAddress = useRef(null);
  const newBiography = useRef(null);
  const [open, setOpen] = React.useState(false);

  const results = [
    [null, useQuery(CURRENT_USER)],
    useMutation(CREATE_IMAGE),
    useMutation(UPDATE_USER)
  ];
  const [currentUser, createImage, updateUser] = results.map(result => result[0]);
  const user = results[0][1].data ? results[0][1].data.currentUser : null;

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

  function handleNewBiographyChange() {
    newBiography.current.focus();
  }

  return (
    <Layout>

      <PageTitleBar title="Update info" backButton />

      <Container maxWidth="md">
        <BaseTabs tabProps={TAB_PROPS}>
          <div>
            <SectionBox titleBar={<SectionTitleBar title="Change username" icon=<PersonIcon /> />} border={false}>
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

            <SectionBox titleBar={<SectionTitleBar title="Change email" icon=<EmailIcon /> />} border={false}>
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

            <SectionBox titleBar={<SectionTitleBar title="Change user image link" icon=<ImageIcon /> />} border={false}>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item xs>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      defaultValue={user.image ? user.image.address : null}
                      inputRef={newImageAddress}
                      label="Enter image link"
                      variant="outlined"
                      onClick={handleNewImageAddressChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </SectionBox>

            <SectionBox titleBar={<SectionTitleBar title="Change biography" icon=<AssignmentIndIcon /> />} border={false}>
              <Grid container spacing={2} alignItems="center" justify="space-between">
                <Grid item xs>
                  <FormControl fullWidth variant="filled">
                    <TextField
                      multiline
                      rows={5}
                      defaultValue={user.biography}
                      inputRef={newBiography}
                      label="Enter biography"
                      variant="outlined"
                      onClick={handleNewBiographyChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </SectionBox>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                let newImage;
                const Name = newName.current.value;
                const Email = newEmail.current.value;
                const Bio = newBiography.current.value;
                if (newImageAddress.current.value) {
                  const res = await createImage({ variables: { address: newImageAddress.current.value }});
                  newImage = res.data.createImage.id;
                }
                await updateUser({ variables: { user: { name: Name, email: Email, biography: Bio, image: newImage }}});
                router.push(`/user/${user.id}`);
              }}
            >
              <Box align="center">
                <Button variant="outlined" type="submit">Submit</Button>
              </Box>
            </form>
          </div>

          <div>
            <SectionBox titleBar={<SectionTitleBar title="Delete user" icon=<DeleteIcon /> />}>
              <Box style={{margin: "1rem"}}>
                <Typography gutterBottom style={{color: "red"}}>Warning: this action CANNOT be undone.</Typography>
              </Box>
              <Box align="center">
                <OKDialog label="Delete" title="Denied" content="No you cannot leave :D">
                  <Button variant="outlined" type="submit">Delete</Button>
                </OKDialog>
              </Box>
            </SectionBox>
          </div>

        </BaseTabs>
      </Container>

    </Layout>
  );
}

export default withAuth(Update);
