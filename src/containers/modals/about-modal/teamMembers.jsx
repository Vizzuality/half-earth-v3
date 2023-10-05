import React from 'react';

import styles from './styles.module';

// team members to show on About Us modal
const teams = [
  {
    team: 'E.O. Wilson Biodiversity Foundation',
    members: [
      { name: 'Paula J. Ehrlich', title: 'President and CEO' },
      { name: 'Walter Jetz', title: 'Scientific Chair' },
      { name: 'Lori Parro', title: 'Chief Financial Officer' },
      { name: 'Amy Tidovsky', title: 'VP of Development' },
      { name: 'Dennis Liu', title: 'VP of Education' },
      { name: 'Jenna Adams', title: 'Master Ambassador' },
      { name: 'Piotr Naskrecki', title: 'Half-Earth Chair' },
      { name: 'Tamara Jolly', title: 'Master Ambassador' },
      { name: 'Chris Sims', title: 'Director of Video and Web Projects' },
      { name: 'Selim Tlili', title: 'Master Ambassador' },
      { name: 'Brooks Bonner', title: 'Program Director to the Foundation.' },
    ],
  },
  {
    team: 'Map of Life',
    members: [
      { name: 'Alexander Killion', title: 'Managing Director' },
      { name: 'Yanina Sica', title: 'Biodiversity Data Specialist' },
      { name: 'Melissa Slater', title: 'ESRI Biodiversity Data Specialist' },
      { name: 'John Wilshire', title: 'Software Engineer' },
      { name: 'Jeremy Cohen', title: 'Associate Research Scientist' },
      { name: 'Kevin Winner', title: 'Modeling Project Lead' },
      { name: 'Kalkidan Chefira', title: 'Software Engineer' },
      { name: 'Julia Portmann', title: 'Research Associate' },
      { name: 'Tamara Rudic', title: 'Science Communication Specialist' },
      { name: 'Danyan Leng', title: 'Postgraduate Associate' },
      { name: 'Christopher Manciero', title: 'Senior Software Developer' },
    ],
  },
  {
    team: 'Vizzuality',
    members: [
      { name: 'Craig Mills', title: 'CEO of Vizzuality' },
      { name: 'Susana Romao', title: 'Project Manager' },
      { name: 'Sofía Aldabet', title: 'Scientist' },
      { name: 'Álvaro Leal', title: 'Full-stack Developer' },
      { name: 'Andreia Ribeiro', title: 'Designer' },
      { name: 'María Relea', title: 'Project Manager' },
      { name: 'Martin Dubuisson', title: 'User Research' },
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
