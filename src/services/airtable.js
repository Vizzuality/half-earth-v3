import Airtable from 'airtable';

const { REACT_APP_AIRTABLE_API_KEY: AIRTABLE_API_KEY } = process.env;
const { REACT_APP_AIRTABLE_USER_RESEARCH_BASE_ID: USER_RESEARCH_BASE } = process.env;

const USERS_TABLE = 'HE-Recruitment-2021';

const userResearchBase = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(USER_RESEARCH_BASE);

function createUserEntry(userData) {
  return new Promise((resolve, reject) => {
    userResearchBase(USERS_TABLE).create([{ fields: { ...userData } }], (error, records) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(records);
    });
  });
}

function updateUserEntry(id, userData) {
  userResearchBase(USERS_TABLE).update([{ id, fields: { ...userData } }]);
}

export {
  createUserEntry,
  updateUserEntry,
};
