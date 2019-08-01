import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CategoryBox from 'components/category-box';
import { render, cleanup } from '@testing-library/react'

afterEach(cleanup);

test('category box is displaying a category name', () => {
  const title = 'MAPPING';
  const props = {
    title: title,
    category: 'Biodiversity',
    isSidebarOpen: true,
    counter: 2
  };

  const { getByText } = render(<CategoryBox {...props} />)
  
  expect(getByText('Biodiversity')).toBeInTheDocument();
  expect(getByText('MAPPING')).toBeInTheDocument();
  expect(getByText('2')).toBeInTheDocument();
})

test('snapshot of category box', () => {
  const props = {
    title: 'MAPPING',
    category: 'Biodiversity',
    isSidebarOpen: true,
    counter: 2
  };
  const { container } = render(<CategoryBox {...props} />)
  expect(container.firstChild).toMatchSnapshot();
})