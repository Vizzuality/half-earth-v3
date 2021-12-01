import { createAction } from 'redux-tools';

const createGtagEventStructure = (category, action, label) => ({ analytics: { category, action, label }})

export const analyticsActionCreator = createAction('analytics action', null, ({category, action, label}) => {
  return createGtagEventStructure(category, action, label)
});
