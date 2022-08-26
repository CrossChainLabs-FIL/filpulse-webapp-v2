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
    '#9127',
    '#9124'
  ]);
  const project = sample([
    {
      title: 'fix: build: use GOCC when building lotus-fountain',
      subtitle: "filecoin-project/lotus",
    },
    {
      title: 'feat: sealing: SectorPipelineStats api',
      subtitle: "filecoin-project/lotus",
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
  const merged = sample([1, 0]);
  const time = sample([
    {
      text: '26 minutes ago',
      number: 26,
    },
    {
      text: 'about 11 hours ago',
      number: 660,
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
    merged: merged,
    timeText,
    timeNumber
  });
}


const PRData = [...Array(24)].map(() => {

  return createObject();
});


export default PRData;
