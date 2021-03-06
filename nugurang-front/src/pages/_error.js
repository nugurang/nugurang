import { useRouter } from 'next/router';
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import FullScreenDialogBox from '../components/FullScreenDialogBox';
import Layout from '../components/Layout';
import PageTitleBar from '../components/PageTitleBar';


export default function ErrorPage({ errorCode }) {
  const router = useRouter();
  return (
    <Layout>
      <FullScreenDialogBox titleBar=<PageTitleBar title="Error!" backButton />>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} align="center">
            <Typography variant="h5">{errorCode}</Typography>
            <Typography variant="h4">Something went wrong.</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Box align="center">
              <Button variant="outlined" onClick={() => router.push('/home')}>Go home</Button>
            </Box>
          </Grid>
        </Grid>
      </FullScreenDialogBox>
    </Layout>
  );
}