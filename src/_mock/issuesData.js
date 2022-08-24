import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// assets
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import avatar4 from '../assets/avatar4.svg';


// ----------------------------------------------------------------------

const issuesData = [...Array(24)].map(() => {

  return ({
    id: faker.datatype.uuid(),
    showId: sample([
      '#9127',
      '#9124'
    ]),
    project: sample([
      {
        title: 'Stuck in FinalizeSector ',
        subtitle: "filecoin-project/lotus",
      },
      {
        title: 'Incompatibility with a ledger-wallet using  "lotus multe cuvinte pt puncte puncte',
        subtitle: "filecoin-project/lotus",
      },
    ]),
    // date: faker.datatype.boolean(),
    person: sample([
      {
        icon: avatar1,
        name: "Aloxaf",
      },
      {
        icon: avatar2,
        name: "magik6k",
      },
      {
        icon: avatar3,
        name: "simlecode",
      },
      {
        icon: avatar4,
        name: "ZenGround0",
      },
    ]),
    assignee: sample([
      {
        haveAssignee: 0,
        icon: avatar4,
        name: "ZenGround0",
      },
      {
        haveAssignee: 1,
        icon: avatar1,
        name: "Aloxaf",
      },
      {
        haveAssignee: 1,
        icon: avatar4,
        name: "ZenGround0",
      },
    ]),
    merged: sample([
      1,
      0,
    ]),
    time: sample([
      '55 minutes ago',
      'about 3 hours ago',
    ]),
  })
});


export default issuesData;
