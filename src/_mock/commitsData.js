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
  const showId = sample([
    '001b405',
    '837473d'
  ]);
  const project = sample([
    {
      title: 'Merge pull request #9143 from Factor8Solutions/wannaby Wallaby genesis, config and bootstrappers',
      subtitle: "filecoin-project/lotus",
    },
    {
      title: 'fix(ci): set the TAG to a valid semver build string',
      subtitle: "filecoin-project/bacalhau",
    },
  ]);
  const projectTitle = project.title;
  const projectSubtitle = project.subtitle;
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
  const time = sample([
    {
      text: '55 minutes ago',
      number: 55,
    },
    {
      text: 'about 3 hours ago',
      number: 180,
    },
  ]);
  const timeText = time.text;
  const timeNumber = time.number;

  return ({
    id: id,
    showId: showId,
    projectTitle: projectTitle,
    projectSubtitle: projectSubtitle,
    personIcon: personIcon,
    personName: personName,
    timeText,
    timeNumber
  });
}

const commitsData = [...Array(24)].map(() => {

  return createObject();
});


export default commitsData;
