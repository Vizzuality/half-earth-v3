import { createAction } from 'redux-tools';

const createGtagEventStructure = (
  category: string,
  action: string,
  label: string
) => ({
  analytics: { category, action, label },
});

export const analyticsActionCreator = createAction(
  'analytics action',
  null,
  ({
    category,
    action,
    label,
  }: {
    category: string;
    action: string;
    label: string;
  }) => {
    return createGtagEventStructure(category, action, label);
  }
);
