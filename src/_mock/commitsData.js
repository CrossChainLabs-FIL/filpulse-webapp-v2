import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// assets
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import avatar4 from '../assets/avatar4.svg';


// ----------------------------------------------------------------------

const commitsData = [...Array(24)].map(() => {

  return ({
    id: faker.datatype.uuid(),
    showId: sample([
      '001b405',
      '837473d'
    ]),
    project: sample([
      {
        title: 'Merge pull request #9143 from Factor8Solutions/wannaby Wallaby genesis, config and bootstrappers',
        subtitle: "filecoin-project/lotus",
      },
      {
        title: 'fix(ci): set the TAG to a valid semver build string',
        subtitle: "filecoin-project/bacalhau",
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
    time: sample([
      '55 minutes ago',
      '1 hour ago',
    ]),
  })
});


export default commitsData;
