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
    '#9071',
    '#9054'
  ]);
  const project = sample([
    {
      title: 'Import seed phrase into lotus wallet',
      subtitle: "opened 20 days ago by Schwartz10",
    },
    {
      title: 'Remove workaround in checkPreCommitI()',
      subtitle: "#9054 opened 23 days ago by geoff-vball",
    },
  ]);
  const projectTitle = project.title;
  const projectSubtitle = project.subtitle;
  const participant = sample([
    [
      avatar1,
      avatar2
    ],
    [
      avatar1,
      avatar2,
      avatar3
    ],
  ]);
  const participantIcons = participant;
  // const participantName = participant.name;
  const merged = sample([1, 0]);
  const comments = sample([
    {
      total: 5,
      unseen: 2,
    },
    {
      total: 2,
      unseen: 1,
    },
  ]);
  const commentsTotal = comments.total;
  const commentsUnseen = comments.unseen;
  const time = sample([
    {
      text: '55 minutes ago',
      number: 55,
    },
    {
      text: '1 hours ago',
      number: 60,
    },
  ]);
  const timeText = time.text;
  const timeNumber = time.number;

  return ({
    id: id,
    showId: showId,
    projectTitle: projectTitle,
    projectSubtitle: projectSubtitle,
    participantIcons: participantIcons,
    merged: merged,
    commentsTotal: commentsTotal,
    commentsUnseen: commentsUnseen,
    timeText,
    timeNumber
  });
}


const watchlistData = [...Array(24)].map(() => {

  return createObject();
});


export default watchlistData;
