import React from 'react';
import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function ProjectInfoBox({ project }) {
  const router = useRouter();
  return (
    <Grid container spacing={2} alignItems="center" justify="space-between">
      <Grid item container spacing={2} alignItems="center" justify="flex-start">
        {
          project.getUsers
          ? (
            <Grid item align="right">
              <AvatarGroup max={3} spacing="small">
                {project.getUsers.map(user => (
                  <Avatar key={user.id} alt={user.name} src={user.image ? user.image.address : null} />
                ))}
              </AvatarGroup>
            </Grid>
          )
          : ( <></> )
        }
        <Grid item>
          <Typography variant="h4">
            {project.name}
          </Typography>
        </Grid>
        <Grid item alignContent='flex-end'>
          <Box justifyContent='flex-end'>
            <Button onClick={() => router.push({pathname: "/peer-review", query: {project: router.query.id}})}>Terminate Project</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}