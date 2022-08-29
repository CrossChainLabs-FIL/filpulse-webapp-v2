import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// assets
import avatar1 from '../assets/avatar1.svg';
import avatar2 from '../assets/avatar2.svg';
import avatar3 from '../assets/avatar3.svg';
import avatar4 from '../assets/avatar4.svg';

// ----------------------------------------------------------------------

const createObject = () => {
  const id = faker.datatype.uuid();
  const person = sample([
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
  ]);
  const personIcon = person.icon;
  const personName = person.name;
  const project = sample([
    'filecoin-project/lotus'
  ]);
  const commits = sample([
    '3,315',
    '1,181'
  ]);
  const pr = sample([
    {
      min: 4,
      max: 845,
    },
    {
      min: 1,
      max: 181,
    },
  ]);
  const prMin = pr.min;
  const prMax = pr.max;
  const issues = sample([
    {
      min: 27,
      max: 77,
    },
    {
      min: 8,
      max: 17,
    },
  ]);
  const issuesMin = issues.min;
  const issuesMax = issues.max;

  return ({
    id: id,
    personIcon: personIcon,
    personName: personName,
    project,
    commits,
    prMin,
    prMax,
    issuesMin,
    issuesMax
  });
}


const contributorsData = [...Array(24)].map(() => {

  return createObject();
});


export default contributorsData;
