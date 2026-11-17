
const sampleImage = require('../assets/icon.png');

export const categories = ['All', 'Workshop', 'Career', 'Sports'];

export const events = [
  {
    id: 'photography-workshop',
    title: 'Campus Photography Workshop',
    category: 'Workshop',
    date: '21 November 2026',
    time: '9.00 a.m. – 12.00 p.m.',
    venue: 'Faculty of Science, University of Kelaniya',
    description:
      'Practise composition and lighting with a phone or camera. Bring one photo you would like to discuss during the group review.',
    image: sampleImage,
  },
  {
    id: 'cv-clinic',
    title: 'CV and Interview Clinic',
    category: 'Career',
    date: '23 November 2026',
    time: '2.00 p.m. – 4.00 p.m.',
    venue: 'Career Guidance Unit, University of Kelaniya',
    description:
      'Bring a draft CV for feedback and practise answering common internship interview questions in pairs.',
    image: sampleImage,
  },
  {
    id: 'swimming-session',
    title: 'University Swimming Training',
    category: 'Sports',
    date: '25 November 2026',
    time: '4.00 p.m. – 5.30 p.m.',
    venue: 'University Sports Complex',
    description:
      'Join a coached session covering warm-up drills, freestyle technique, and relay practice.',
    image: sampleImage,
  },
  {
    id: 'mobile-ui-workshop',
    title: 'Mobile UI Design Workshop',
    category: 'Workshop',
    date: '27 November 2026',
    time: '10.00 a.m. – 12.00 p.m.',
    venue: 'Computer Laboratory, Faculty of Science',
    description:
      'Design a mobile app screen and turn it into a clickable prototype. Bring a laptop and a sketch of your app idea.',
    image: sampleImage,
  },
];