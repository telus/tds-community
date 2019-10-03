import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DecorativeIcon from '@tds/core-decorative-icon'
import A11yContent from '@tds/core-a11y-content'
import { getCopy, safeRest } from '@tds/util-helpers'

import Panel from './Panel/Panel'
import {
  PaginationContainer,
  Controls,
  PaginationButtonStyle,
  ButtonLabel,
  PaginationList,
  PaginationListMobile,
  GeneralPagination,
  GeneralPaginationButton,
  PaginationCurrent,
  PaginationEllipsis,
  PrevPaginationContainer,
  NextPaginationContainer,
} from './styles'
import hash from './hash'
import copyDictionary from './paginationText'

/**
 * @version ./package.json
 */
class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      panels: this.props.children.length,
      showPrevious: false,
      showNext: true,
    }
  }

  componentDidMount() {
    this.handleButtonState()
  }

  checkForRegularTabs = (index, isMobile) => {
    const { current, panels } = this.state
    // Check if there are less than 7 panels,
    // if the index is at the first panel
    // if the index is next to the first panel
    // if current is less than three and index is less than five
    // and the inverse if current within two of total and index is greater than minus 4 of total
    if (isMobile) {
      return (
        panels < 5 ||
        index === 1 ||
        index === panels ||
        (current < 2 && index < 3) ||
        (current > panels - 1 && index > panels - 2)
      )
    }

    return (
      panels < 7 ||
      index === 1 ||
      index === panels ||
      index === current + 1 ||
      index === current - 1 ||
      (current < 3 && index < 5) ||
      (current > panels - 2 && index > panels - 4)
    )
  }

  checkForEllipsis = (index, isMobile) => {
    const { current, panels } = this.state
    // Check if we should render an ellipsis
    // if index is less than two or greater than two of current
    // if current is less than three and index is five
    // and the inverse if current is within two of total and index is total minus 5
    if (isMobile) {
      return (
        index === current - 1 ||
        index === current + 1 ||
        (current < 2 && index === 2) ||
        (current > panels - 1 && index === panels - 5) ||
        (current === 1 && index === 3 && panels > 3)
      )
    }
    return (
      index === current - 2 ||
      index === current + 2 ||
      (current < 3 && index === 5) ||
      (current > panels - 2 && index === panels - 5)
    )
  }

  mapTabs = isMobile => {
    const { copy } = this.props
    let { current } = this.state
    // new set of rules, under mobile view , right before Tablet,
    // only show first, current, last, else, in between show ellipsis, only apply these rules under mobile view
    current = parseInt(current, 10) || 0
    return this.props.children.map((item, i) => {
      const index = i + 1
      if (current === index) {
        return (
          <PaginationCurrent key={hash(`${i}-1`)}>
            {index}
            <A11yContent>{getCopy(copyDictionary, copy).currentText}</A11yContent>
          </PaginationCurrent>
        )
      }
      if (this.checkForRegularTabs(index, isMobile)) {
        return (
          <GeneralPagination key={hash(`${i}-3`)}>
            <GeneralPaginationButton
              value={index}
              onClick={e => this.handleClick(e)}
              aria-label={`${getCopy(copyDictionary, copy).goToText} ${index}`}
            >
              {index}
            </GeneralPaginationButton>
          </GeneralPagination>
        )
      }
      if (this.checkForEllipsis(index, isMobile)) {
        return <PaginationEllipsis key={hash(`${i}-4`)}>...</PaginationEllipsis>
      }

      return null
    })
  }

  handleClick = e => {
    e.preventDefault()
    const value = parseInt(e.currentTarget.value, 10) || 0
    if (value > this.state.panels || value < 1) {
      return null
    }
    return this.setState({ current: value }, this.handleButtonState)
  }

  handleButtonState = () => {
    this.setState({
      showPrevious: this.state.current !== 1,
      showNext: this.state.current !== this.state.panels,
    })
  }

  render() {
    const { children, copy, ...rest } = this.props

    if (!Array.isArray(children) || children.length <= 1) {
      // Pagination should not display the Controls when there is only one panel
      return <Panel {...rest}>{children}</Panel>
    }

    const { current } = this.state
    const increaseNumber = parseInt(current + 1, 10)
    const decreaseNumber = parseInt(current - 1, 10)
    const previousText = copy !== 'fr' ? 'Prev' : 'Précédent'
    const nextText = copy !== 'fr' ? 'Next' : 'Suivant'
    const previousLabel = copy !== 'fr' ? 'Go to previous panel' : 'Aller au panneau précédent'
    const NextLabel = copy !== 'fr' ? 'Go to next panel' : 'Aller au prochain panneau'
    return (
      <PaginationContainer {...safeRest(rest)}>
        <Panel {...rest}>{children[current - 1]}</Panel>
        <Controls>
          <PrevPaginationContainer showPrevious={this.state.showPrevious}>
            <PaginationButtonStyle
              value={decreaseNumber}
              onClick={e => this.handleClick(e)}
              aria-label={previousLabel}
            >
              <DecorativeIcon symbol="leftChevron" size={16} />{' '}
              <ButtonLabel>{previousText}</ButtonLabel>
            </PaginationButtonStyle>
          </PrevPaginationContainer>
          <PaginationList>{this.mapTabs(false)}</PaginationList>
          <PaginationListMobile>{this.mapTabs(true)}</PaginationListMobile>
          <NextPaginationContainer showNext={this.state.showNext}>
            <PaginationButtonStyle
              value={increaseNumber}
              onClick={e => this.handleClick(e)}
              aria-label={NextLabel}
            >
              <ButtonLabel>{nextText}</ButtonLabel> <DecorativeIcon symbol="chevron" size={16} />
            </PaginationButtonStyle>
          </NextPaginationContainer>
        </Controls>
      </PaginationContainer>
    )
  }
}

Pagination.propTypes = {
  /**
   * The pagination panels. Must be at least one `<Pagination.Panel />`.
   */
  children: PropTypes.node.isRequired,
  /**
   * The default copy to be used.
   */
  copy: PropTypes.oneOf(['en', 'fr']).isRequired,
}

Pagination.Panel = Panel

export default Pagination
