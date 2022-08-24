import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// assets
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import avatar4 from '../assets/avatar4.svg';

// ----------------------------------------------------------------------

const watchlistData = [...Array(24)].map(() => {

  return ({
    id: faker.datatype.uuid(),
    showId: sample([
      '#9071',
      '#9054'
    ]),
    project: sample([
      {
        title: 'Import seed phrase into lotus wallet',
        subtitle: "opened 20 days ago by Schwartz10",
      },
      {
        title: 'Remove workaround in checkPreCommitI()',
        subtitle: "#9054 opened 23 days ago by geoff-vball",
      },
    ]),
    participant: sample([
      [
        avatar1,
        avatar2
      ],
      [
        avatar1,
        avatar2,
        avatar3
      ],
    ]),
    assignee: sample([
      {
        haveAssignee: 0,
        icon: avatar4,
      },
      {
        haveAssignee: 1,
        icon: avatar1,
      },
      {
        haveAssignee: 1,
        icon: avatar4,
      },
    ]),
    comments: sample([
      {
        total: '5',
        unseen: "2",
      },
      {
        total: '2',
        unseen: "1",
      },
    ]),
    time: sample([
      '55 minutes ago',
      '1 hour ago',
    ]),

  })
});


export default watchlistData;
