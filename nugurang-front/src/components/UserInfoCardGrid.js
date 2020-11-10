import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import 'array-flat-polyfill';

import NoContentsBox from './NoContentsBox';
import UserInfoCard from './UserInfoCard';


export default function UserInfoCardGrid({ items, link=null, xs=12, sm=null, md=null, lg=null, xl=null }) {
  const router = useRouter();
  return (
    <>
      {
        items && items.length > 0
        ? (
          <Grid container alignments="center" justify="flex-start">
            {[items].flat().map((item) => (
              <Grid item
                key={item.id}
                xs={xs || 12}
                sm={sm || xs || 12}
                md={md || sm || xs || 12}
                lg={lg || md || sm || xs || 12}
                xl={xl || lg || md || sm || xs || 12}
              >
                <UserInfoCard
                  user={item}
                  onClick={() => router.push(`${link}/${item.id}`)}
                />
              </Grid>
          ))}
          </Grid>
        )
        : <NoContentsBox />
      }
    </>
  );
}