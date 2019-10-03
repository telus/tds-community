import React from 'react'
import { mount } from 'enzyme'

import Pagination from '../Pagination'

describe('Pagination', () => {
  const children = (
    <Pagination copy="en">
      <Pagination.Panel>Content 1</Pagination.Panel>
      <Pagination.Panel>Content 2</Pagination.Panel>
      <Pagination.Panel>Content 3</Pagination.Panel>
      <Pagination.Panel>Content 4</Pagination.Panel>
      <Pagination.Panel>Content 5</Pagination.Panel>
      <Pagination.Panel>Content 6</Pagination.Panel>
      <Pagination.Panel>Content 7</Pagination.Panel>
      <Pagination.Panel>Content 8</Pagination.Panel>
      <Pagination.Panel>
        <div>
          <p>This is a paragraph on the 9th panel</p>
        </div>
      </Pagination.Panel>
    </Pagination>
  )
  const doMount = () => mount(children)

  it('renders', () => {
    const pagination = doMount()

    expect(pagination).toMatchSnapshot()
  })

  it('does other things', () => {
    const pagination = doMount()

    expect(pagination).toExist()
  })

  it('does not allow custom CSS', () => {
    const pagination = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(pagination).not.toHaveProp('className', 'my-custom-class')
    expect(pagination).not.toHaveProp('style')
  })
})
