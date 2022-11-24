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
      title: 'Stuck in FinalizeSector ',
      subtitle: "filecoin-project/lotus",
      link: "https://www.google.com"
    },
    {
      title: 'Incompatibility with a ledger-wallet using  "lotus multe cuvinte pt puncte puncte',
      subtitle: "filecoin-project/lotus",
      link: "https://www.google.com"
    },
  ]);
  const projectTitle = project.title;
  const projectSubtitle = project.subtitle;
  const projectLink = project.link;
  const person = sample([
    {
      icon: avatar1,
      name: "Aloxaf",
      link: "https://www.google.com"
    },
    {
      icon: avatar2,
      name: "magik6k",
      link: "https://www.google.com"
    },
    {
      icon: avatar3,
      name: "simlecode",
      link: "https://www.google.com"
    },
    {
      icon: avatar4,
      name: "ZenGround0",
      link: "https://www.google.com"
    },
  ]);
  const personIcon = person.icon;
  const personName = person.name;
  const personLink = person.link;
  const assignee = sample([
    [
      {
        icon: avatar4,
        name: "ZenGround0",
        link: "https://www.google.com"
      },
      {
        icon: avatar1,
        name: "Aloxaf",
        link: "https://www.google.com"
      },
      {
        icon: avatar4,
        name: "ZenGround0",
        link: "https://www.google.com"
      },
    ],
    [],
    [
      {
        icon: avatar1,
        name: "Aloxaf",
        link: "https://www.google.com"
      },
      {
        icon: avatar4,
        name: "ZenGround0",
        link: "https://www.google.com"
      },
    ],
    [
      {
        icon: avatar1,
        name: "Aloxaf",
        link: "https://www.google.com"
      },
    ],
    [
      {
        icon: avatar2,
        name: "ZenGround0",
        link: "https://www.google.com"
      },
      {
        icon: avatar4,
        name: "ZenGround0",
        link: "https://www.google.com"
      },
      {
        icon: avatar1,
        name: "Aloxaf",
        link: "https://www.google.com"
      },
      {
        icon: avatar4,
        name: "ZenGround0",
        link: "https://www.google.com"
      },
    ],
  ]);
  const assigneeIcon = assignee.map((currentAssignee) => currentAssignee.icon);
  const assigneeName = assignee.map((currentAssignee) => currentAssignee.name);
  const assigneeLink = assignee.map((currentAssignee) => currentAssignee.link);
  const merged = sample([1, 0]);
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
    projectLink: projectLink,
    personIcon: personIcon,
    personName: personName,
    personLink: personLink,
    assigneeIcon: assigneeIcon,
    assigneeName: assigneeName,
    assigneeLink: assigneeLink,
    merged: merged,
    timeText,
    timeNumber
  });
}


const issuesData = [...Array(24)].map(() => {

  return createObject();
});


export default issuesData;
