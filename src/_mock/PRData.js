import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// assets
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import avatar4 from '../assets/avatar4.svg';

// ----------------------------------------------------------------------

const PRData = [...Array(24)].map(() => {

  return ({
    id: faker.datatype.uuid(),
    showId: sample([
      '#9127',
      '#9124'
    ]),
    project: sample([
      {
        title: 'fix: build: use GOCC when building lotus-fountain',
        subtitle: "filecoin-project/lotus",
      },
      {
        title: 'feat: sealing: SectorPipelineStats api',
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
    merged: sample([
      1,
      0,
    ]),
    time: sample([
      '26 minutes ago',
      'about 11 hours ago',
    ]),
  })
});


export default PRData;
