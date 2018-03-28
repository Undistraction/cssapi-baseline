import React from 'react'
import * as glamor from 'glamor'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import createBaseline from '../../index'

expect.addSnapshotSerializer(serializer)

const baseline = createBaseline()

function Element() {
  const className = glamor.css({
    ...baseline.text(16),
  })
  return <div className={`${className}`} />
}

describe(`works with galmour`, () => {
  it(`renders component with correct 'fontSize' and 'lineHeight'`, () => {
    const tree = renderer.create(<Element />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
