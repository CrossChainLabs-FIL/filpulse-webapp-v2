// import { useTheme } from '@mui/material/styles';
import {
  Container,
  Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useState, useEffect } from 'react';
import Page from '../components/Page';
import { Footer } from '../components/Footer';
import { Client } from '../utils/client';

import {
  Commits,
  CardWidget,
  TopContributors,
  Issues,
  ActiveContributors,
} from '../sections';

import TableApp from '../components/TableApp';

const client = new Client();

export default function Dashboard() {
  // const theme = useTheme();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xl'));

  const [state, setState] = useState({ commits: '', repositories: '', contributors: '', prs: '' });
  const [issuesData, setIssuesData] = useState([0, 0]);

  useEffect(() => {
    client.get('overview').then((overview) => {
      let open = parseInt((overview?.issues_open) ? overview?.issues_open : 0);
      let closed = parseInt((overview?.issues_closed) ? overview?.issues_closed : 0);

      setIssuesData([open, closed]);

      setState({
        commits: overview.commits,
        repositories: overview.repos,
        contributors: overview.contributors,
        prs: overview.prs,
      })

    });
  }, [setState]);

  return (
    <Page title="FilPulse">
      <Container maxWidth={matches ? 'lg' : 'xl'}   >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <CardWidget
              name='Commits'
              value={((state.commits) ? (state.commits) : 'N/A')}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <CardWidget
              name='Repositories'
              value={((state.repositories) ? (state.repositories) : 'N/A')}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <CardWidget
              name='Contributors'
              value={((state.contributors) ? (state.contributors) : 'N/A')}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardWidget
              name='PRs'
              value={((state.prs) ? (state.prs) : 'N/A')}
            />
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <TopContributors />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Commits />
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <Issues issuesData={issuesData} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ActiveContributors />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TableApp />
          </Grid>

        </Grid>
        <Footer />
      </Container>
    </Page>
  );
}
