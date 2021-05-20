export const STEP_1 = 'step1';
export const STEP_2 = 'step2';

export const PROFESSIONS = [
  {label: 'Student', slug: 'student'},
  {label: 'Teacher', slug: 'teacher'},
  {label: 'Researcher', slug: 'researcher'},
  {label: 'Conservationist', slug: 'conservationist'},
  {label: 'Government worker', slug: 'government-worker'},
  {label: 'Media/journalism', slug: 'media-journalism'},
  {label: 'Other', slug: 'other'}
]
  
export const MAP_USE = [
  {label: 'Class project', slug: 'class-project'},
  {label: 'Just checking out ', slug: 'just-checking-out'},
  {label: 'Fun', slug: 'fun'},
  {label: 'Conservation', slug: 'conservation'},
  {label: 'Planning', slug: 'planning'},
  {label: 'Research ', slug: 'research'},
  {label: 'Other', slug: 'other'}
]

export const USER_MODAL_QUESTIONS = [
  {
    text: 'Which is your profession?* (The one that brought you here).',
    dropdownOptions: PROFESSIONS,
    inputPlaceholder: 'Write your profession here',
    required: true,
    userStateKey: 'job_role'
  },
  {
    text: 'Please tell us what you use the map for:*',
    dropdownOptions: MAP_USE,
    inputPlaceholder: 'What do you use the map for?',
    required: true,
    userStateKey: 'map_usage'
  },
]

export const DROPDOWN_INITIAL_VALUE = {label: 'choose an option', slug: 'placeholder'}