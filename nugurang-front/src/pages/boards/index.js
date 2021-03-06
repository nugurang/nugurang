import { gql , useApolloClient, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import { useState } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import CategoryIcon from '@material-ui/icons/Category';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import WhatshotIcon from '@material-ui/icons/Whatshot';

import 'array-flat-polyfill';
import { COMMON_BOARDS, EVENT_BOARDS } from '../../config';
import withAuth from '../../components/withAuth';
import BaseCard from '../../components/BaseCard';
import BaseSwitch from '../../components/BaseSwitch';
import CallingCard from '../../components/CallingCard';
import GraphQlError from '../../components/GraphQlError';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import NoContentsBox from '../../components/NoContentsBox';
import PageTitleBar from '../../components/PageTitleBar';
import SectionTitleBar from '../../components/SectionTitleBar';
import SectionBox from '../../components/SectionBox';
import ThreadListItem from '../../components/ThreadListItem';


const GET_BOARD_BY_NAME = gql`
  query getBoardByName($name: String!) {
    getBoardByName(name: $name) {
      id
    }
  }
`;

const GET_THREADS_BY_BOARD_NAMES = gql`
  query getThreadsByBoardNames($boardNames: [String]!) {
    getThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
      id
      name
      user {
        name
        image {
          address
        }
      }
      firstArticle {
        id
        title
        content
        createdAt
        modifiedAt
        images {
          address
        }
        viewCount
        upCount
        downCount
        starCount
      }
    }
  }
`;

const GET_HOT_THREADS_BY_BOARD_NAMES = gql`
  query getHotThreadsByBoardNames($boardNames: [String]!) {
    getHotThreadsByBoardNames(boards: $boardNames, page: 0, pageSize: 5) {
      id
      name
      user {
        name
        image {
          address
        }
      }
      firstArticle {
        id
        title
        content
        createdAt
        modifiedAt
        images {
          address
        }
        viewCount
        upCount
        downCount
        starCount
      }
    }
  }
`;


function Boards() {
  const client = useApolloClient();
  const router = useRouter();
  const [showEvents, setShowEvents] = useState(false);
  const toggleShowEvents = () => {
    setShowEvents((prev) => !prev);
  };

  const results = [
    [null, useQuery(GET_HOT_THREADS_BY_BOARD_NAMES, {variables: {boardNames: COMMON_BOARDS}})],
    [null, useQuery(GET_HOT_THREADS_BY_BOARD_NAMES, {variables: {boardNames: EVENT_BOARDS}})],
    [null, useQuery(GET_THREADS_BY_BOARD_NAMES, {variables: {boardNames: COMMON_BOARDS}})],
    [null, useQuery(GET_THREADS_BY_BOARD_NAMES, {variables: {boardNames: EVENT_BOARDS}})],
    useLazyQuery(GET_BOARD_BY_NAME)
  ];

  if (results.some(result => result[1].loading))
    return <Loading />;
  const errorResult = results.find(result => result[1].error);
  if (errorResult)
    return <GraphQlError error={errorResult[1].error} />


  const hotThreads = results[0][1].data.getHotThreadsByBoardNames;
  const hotEvents = results[1][1].data.getHotThreadsByBoardNames;
  const recentThreads = results[2][1].data.getThreadsByBoardNames;
  const recentEvents = results[3][1].data.getThreadsByBoardNames;
  const getBoardByName = results[4][0];
  const boardData = results[4][1].data;

  hotThreads.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });
  hotEvents.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });
  recentThreads.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });
  recentEvents.forEach(function(thread){
    thread.onClick = () => router.push(`/threads/${thread.id}`);
  });

  let key = 0;
  const currentBoard = showEvents ? EVENT_BOARDS : COMMON_BOARDS;
  return (
    <Layout>
      <PageTitleBar title="Boards" backButton>
        <BaseSwitch label="Show events" checked={showEvents} onChange={toggleShowEvents} />
      </PageTitleBar>
      <Grid container>
        <Grid item xs={12}>
          <SectionBox titleBar=<SectionTitleBar title="Categories" icon={<CategoryIcon />} />>
            <Grid container>
              {[currentBoard].flat().map((boardName) =>
                (
                  <Grid item key={++key} xs={6} sm={4} md={3} align="center">
                    <CallingCard
                      label={boardName}
                      image="/static/images/sample_1.jpg"
                      onClick={async (e) => {
                        e.preventDefault();
                        console.log(boardName);
                        const { data } = await client.query({
                          query: GET_BOARD_BY_NAME,
                          variables: { name: boardName },
                        });
                        const boardId = data.getBoardByName ? data.getBoardByName.id : ``;
                        router.push(`/boards/${boardId}`);
                      }}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </SectionBox>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display={showEvents ? "none" : "block"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Threads" icon={<WhatshotIcon />} />}
            >
              {
                hotThreads && (hotThreads.length)
                ? <List>{[hotThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
          <Box display={showEvents ? "block" : "none"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Hot Events" icon={<WhatshotIcon />} />}
            >
              {
                hotEvents && (hotEvents.length)
                ? <List>{[hotEvents].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display={showEvents ? "none" : "block"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Recent Threads" icon={<TrendingUpIcon />} />}
            >
              {
                recentThreads && (recentThreads.length)
                ? <List>{[recentThreads].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
          <Box display={showEvents ? "block" : "none"}>
            <SectionBox
              titleBar={<SectionTitleBar title="Recent Events" icon={<TrendingUpIcon />} />}
            >
              {
                recentEvents && (recentEvents.length)
                ? <List>{[recentEvents].flat().map((thread) => <ThreadListItem thread={thread} />)}</List>
                : <NoContentsBox />
              }
            </SectionBox>
          </Box>
        </Grid>

      </Grid>
    </Layout>
  );
}

export default withAuth(Boards);
