import styles from './styles.module';

// team members to show on About Us modal
const teams = [
  {
    team: 'E.O. Wilson Biodiversity Foundation',
    members: [
      { name: 'Paula J. Ehrlich', title: 'President and CEO' },
      { name: 'Walter Jetz', title: 'Jack and Laura Dangermond Scientific Chair' },
      { name: 'Dennis Liu', title: 'VP of Education' },
      { name: 'Niquole Esters', title: 'VP of Strategic Engagement' },
      { name: 'Brooks Bonner', title: 'Program Director, Places for a Half-Earth Future, Half-Earth Chairs & Scholars' },
      { name: 'Jocelyn Miller', title: 'Education Program Manager' },
    ],
  },
  {
    team: 'Map of Life',
    members: [
      { name: 'Walter Jetz ', title: 'Lead PI of Map of Life – planning and oversight of execution of project activities; supervision of research and software engineering staff' },
      { name: 'Alexander Killion', title: 'Managing Director – Geospatial prioritization and conservation' },
      { name: 'Christopher Manciero', title: 'Sr. Software Developer - Software engineering' },
      { name: 'Claire Hoffmann', title: 'Science and User Partner Engagement' },
      { name: 'John Wilshire', title: 'Software Engineer - Software engineering' },
      { name: 'Kalkidan Chefira', title: 'Software Engineer - Software engineering' },
      { name: 'Glen Woelfl', title: 'Data Engineer - Software engineering' },
      { name: 'Beth Gerstner', title: 'Research Associate - Spatial analytics' },
      { name: 'Melissa Slater', title: 'Data Associate – Data management' },
      { name: 'Kevin Winner', title: 'Spatial Modelling Lead - Spatial analytics' },
      { name: 'Elise Boos', title: 'Biodiversity Data Coordinator' },
      { name: 'Tamara Rudic', title: 'Science Communication Specialist – StoryMaps and UI/UX' },
      { name: 'Jeremy Cohen', title: 'Associate Research Scientist, Biodiversity and Climate change' },
      { name: 'Meredith Palmer', title: 'Biodiversity data integration and change analytics ' },
      { name: 'Frank La Sorte', title: 'Consultant, Spatial biodiversity and Global Change' },
    ],
  },
  {
    team: 'Vizzuality',
    members: [
      { name: 'David Gonzalez', title: 'CEO of Vizzuality' },
      { name: 'Susana Romao', title: 'Project Portfolio & Partnerships Lead' },
      { name: 'Sofía Aldabet', title: 'Data Management' },
      { name: 'Álvaro Leal', title: 'Full-stack Developer' },
      { name: 'Andreia Ribeiro', title: 'Designer' },
      { name: 'María Relea', title: 'Project Manager' },
    ],
  },
];

function TeamMembers() {
  return teams.map((team) => {
    return (
      <section className={styles.teamSection}>
        <h2 className={styles.title} key={team.team}>
          {team.team}
        </h2>
        <div className={styles.teamMembers}>
          {team.members.map((member) => {
            return (
              <div className={styles.member} key={member.name}>
                <span>{member.name}</span>
                <span>{member.title}</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  });
}

export default TeamMembers;
