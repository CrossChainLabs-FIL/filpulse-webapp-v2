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
    },
    {
      title: 'Incompatibility with a ledger-wallet using  "lotus multe cuvinte pt puncte puncte',
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
  const assignee = sample([
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
  ]);
  const haveAssignee = assignee.haveAssignee;
  const assigneeIcon = assignee.icon;
  const assigneeName = assignee.name;
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
    personIcon: personIcon,
    personName: personName,
    haveAssignee: haveAssignee,
    assigneeIcon: assigneeIcon,
    assigneeName: assigneeName,
    merged: merged,
    timeText,
    timeNumber
  });
}


const issuesData = [...Array(24)].map(() => {

  return createObject();
});


export default issuesData;
