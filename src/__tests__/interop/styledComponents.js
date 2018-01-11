import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import rhythm from '../../index';

describe(`works with styled-components`, () => {
  const baseline = rhythm.configure();
  const Element = styled.div`
    ${baseline(16)};
  `;
  const tree = renderer.create(<Element />).toJSON();

  it(`renders component with correct 'font-size' and 'line-height'`, () => {
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule(`font-size`, `1rem`);
    expect(tree).toHaveStyleRule(`line-height`, `1.25rem`);
  });
});
