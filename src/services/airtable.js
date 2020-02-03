import Airtable from 'airtable';
const { REACT_APP_AIRTABLE_API_KEY: AIRTABLE_API_KEY } = process.env;
const { REACT_APP_AIRTABLE_USER_RESEARCH_BASE_ID: USER_RESEARCH_BASE } = process.env;

const USERS_TABLE = 'Users'

const userResearchBase = new Airtable({apiKey: AIRTABLE_API_KEY}).base(USER_RESEARCH_BASE);

function createUserEntry(userData) {
  userResearchBase(USERS_TABLE).create([{fields: { ...userData }}], (e, records) => console.log(e, records))
}

export {
  createUserEntry
};