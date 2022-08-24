import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// assets
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import avatar4 from '../assets/avatar4.svg';

// ----------------------------------------------------------------------

const contributorsData = [...Array(24)].map(() => {

  return ({
    id: faker.datatype.uuid(),
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
    project: sample([
      'filecoin-project/lotus',
    ]),
    // date: faker.datatype.boolean(),
    commits: sample([
      '3,315',
      '1,181'
    ]),
    pr: sample([
      {
        min: '4',
        max: "845",
      },
      {
        min: '1',
        max: "181",
      },
    ]),
    issues: sample([
      {
        min: '27',
        max: "77",
      },
      {
        min: '8',
        max: "17",
      },
    ]),
  })
});


export default contributorsData;
