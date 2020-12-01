import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ImageIcon from '@material-ui/icons/Image';

import Layout from '../../components/Layout';
import PageTitleBar from '../../components/PageTitleBar';
import SectionBox from '../../components/SectionBox';
import SectionTitleBar from '../../components/SectionTitleBar';
import Loading from '../../components/Loading';
import GraphQlError from '../../components/GraphQlError';
import withAuth from '../../components/withAuth';


const CREATE_IMAGE = gql`
  mutation createImage($address: String!) {
    createImage (address: $address) {
      id
    }
  }
`;

const CREATE_THREAD = gql`
  mutation createThread($board: ID!, $thread: ThreadInput!) {
    createThread (board: $board, thread: $thread) {
      id
    }
  }
`;


function CreateThread() {
  const router = useRouter();
  const newTitle = useRef(null);
  const newContent = useRef(null);
  const newImageAddress = useRef(null);

  const results = [
    useMutation(CREATE_IMAGE),
    useMutation(CREATE_THREAD)
  ];
  const [createImage, createThread] = results.map(result => result[0]);

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />

  function handleNewTitleChange() {
    newTitle.current.focus();
  }

  function handleNewContentChange() {
    newContent.current.focus();
  }

  function handleNewImageAddressChange() {
    newImageAddress.current.focus();
  }

  return (
    <Layout>
      <PageTitleBar title="Create new thread" backButton />

      <Container maxWidth="md">
        <SectionBox titleBar={<SectionTitleBar title="Add title" icon=<GroupAddIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={newTitle}
                  label="Enter title"
                  variant="outlined"
                  onClick={handleNewTitleChange}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>

        <SectionBox titleBar={<SectionTitleBar title="Add content" icon=<GroupAddIcon /> />}>
          <Grid container spacing={2} alignItems="center" justify="space-between">
            <Grid item xs>
              <FormControl fullWidth variant="filled">
                <TextField
                  inputRef={newContent}
                  label="Enter content"
                  variant="outlined"
                  onClick={handleNewContentChange}
                  multiline
                  rows={8}
                />
              </FormControl>
            </Grid>
          </Grid>
        </SectionBox>


        <SectionBox titleBar={<SectionTitleBar title="Add image link" icon=<ImageIcon /> />}>
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
            const Title = newTitle.current.value;
            const Content = newContent.current.value;
            if (newImageAddress.current.value) {
              const imageRes = await createImage({ variables: { address: newImageAddress.current.value }});
              image = imageRes.data.createImage.id;
            }
            console.log(newTitle.current.value);
            const threadRes = await createThread({ variables: { board: router.query.board, thread: {name: Title, firstArticle: {title: Title, content: Content, images: [image]}}}});
            router.push(`/threads/${threadRes.data.createThread.id}`);
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

export default withAuth(CreateThread);