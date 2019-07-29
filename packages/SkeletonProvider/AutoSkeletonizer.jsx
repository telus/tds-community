import React from 'react'
import Text from '@tds/core-text'
import Heading from '@tds/core-heading'
import Image from '@tds/core-image'
import Skeletons from './tds'
import withSkeleton from './withSkeleton'

const AutoSkeletonizer = children => {
  const skeletonChildren = React.Children.map(children, childElement => {
    let child = childElement

    if (child === null) {
      return null
    }

    if (child.props && 'children' in child.props) {
      child = React.cloneElement(child, {
        children: AutoSkeletonizer(child.props.children),
      })
    }

    if (child.props && 'skeleton' in child.props && typeof child.props.skeleton === 'function') {
      const EnhancedChild = withSkeleton(child.props.skeleton)(() => child)
      return <EnhancedChild {...child.props} />
    }

    if (child.type === Text) {
      return <Skeletons.Text {...child.props} />
    }

    if (child.type === Heading) {
      return <Skeletons.Heading {...child.props} />
    }

    if (child.type === Image) {
      return <Skeletons.Image {...child.props} />
    }

    return child
  })

  return skeletonChildren
}

export default AutoSkeletonizer
