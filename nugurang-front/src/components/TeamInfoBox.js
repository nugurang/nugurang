import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default function TeamInfoBox({ team }) {
  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item container spacing={2} alignItems="center" justify="flex-start">
        {
          team.getUsers
          ? (
            <Grid item align="right">
              <AvatarGroup max={3} spacing="small">
                {team.getUsers.map(user => (
                  <Avatar key={user.id} alt={user.name} src={user.image} />
                ))}
              </AvatarGroup>
            </Grid>
          )
          : ( <></> )
        }
        <Grid item>
          <Typography variant="h4">
            {team.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}