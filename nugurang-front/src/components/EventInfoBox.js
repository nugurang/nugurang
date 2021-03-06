import dayjs from "dayjs";
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { NO_THREAD_IMAGE_ADDRESS } from '../config';
import BaseImage from './BaseImage';
import NoContentsBox from './NoContentsBox';


export default function EventInfoBox({ event }) {
  return (
    event
    ? (
      <Box>
        <BaseImage
          image={event.images && event.images.length() > 0 ? event.images[0].address : NO_THREAD_IMAGE_ADDRESS}
          imageTitle={event.name ? event.name : null}
        />
        <Accordion variant="outlined" defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" gutterBottom>{event.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  {dayjs(event.eventStart).format('YYYY-MM-DD HH:mm')}
                  {" ~ "}
                </Typography>
                <Typography variant="h5">
                  {dayjs(event.eventEnd).format('YYYY-MM-DD HH:mm')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{event.description}</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    )
    : <NoContentsBox />
  );
}