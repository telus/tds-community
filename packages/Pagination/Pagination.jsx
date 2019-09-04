import React, { Component } from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'
import DecorativeIcon from '@tds/core-decorative-icon'
import A11yContent from '@tds/core-a11y-content'
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

  checkForRegularTabs = index => {
    const { current, panels } = this.state
    // Check if there are less than 7 panels,
    // if the index is at the first panel
    // if the index is next to the first panel
    // if current is less than three and index is less than five
    // and the inverse if current within two of total and index is greater than minus 4 of total
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

  checkForEllipsis = index => {
    const { current, panels } = this.state
    // Check if we should render an ellipsis
    // if index is less than two or greater than two of current
    // if current is less than three and index is five
    // and the inverse if current is within two of total and index is total minus 5
    return (
      index === current - 2 ||
      index === current + 2 ||
      (current < 3 && index === 5) ||
      (current > panels - 2 && index === panels - 5)
    )
  }

  mapTabs = () => {
    const goToText = this.props.copy === 'fr' ? 'Aller au panneau n°' : 'Go to panel number'
    const currentText = this.props.copy === 'fr' ? '(page actuelle)' : '(current)'
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
            <A11yContent>{currentText}</A11yContent>
          </PaginationCurrent>
        )
      }
      if (this.checkForRegularTabs(index)) {
        return (
          <GeneralPagination key={hash(`${i}-3`)}>
            <GeneralPaginationButton
              value={index}
              onClick={e => this.handleClick(e)}
              aria-label={`${goToText} ${index}`}
            >
              {index}
            </GeneralPaginationButton>
          </GeneralPagination>
        )
      }
      if (this.checkForEllipsis(index)) {
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
    if (this.state.current !== 1) {
      this.setState({ showPrevious: true })
    } else {
      this.setState({ showPrevious: false })
    }
    if (this.state.current !== this.state.panels) {
      this.setState({ showNext: true })
    } else {
      this.setState({ showNext: false })
    }
  }

  renderMobileTabs = () => {
    let { current } = this.state
    const goToText = this.props.copy === 'fr' ? 'Aller au panneau n°' : 'Go to panel number'
    const currentText = this.props.copy === 'fr' ? '(page actuelle)' : '(current)'
    current = parseInt(current, 10) || 0
    if (current === 1) {
      return (
        <React.Fragment>
          <PaginationCurrent>
            {current}
            <A11yContent>{currentText}</A11yContent>
          </PaginationCurrent>
          <PaginationEllipsis>...</PaginationEllipsis>
          <GeneralPagination>
            <GeneralPaginationButton
              value={this.props.children && this.props.children.length}
              onClick={e => this.handleClick(e)}
              aria-label={`${goToText} ${this.props.children.length}`}
            >
              {this.props.children && this.props.children.length}
            </GeneralPaginationButton>
          </GeneralPagination>
        </React.Fragment>
      )
    }
    if (current === this.props.children.length) {
      return (
        <React.Fragment>
          <GeneralPagination>
            <GeneralPaginationButton
              value="1"
              onClick={e => this.handleClick(e)}
              aria-label={`${goToText} 1`}
            >
              1
            </GeneralPaginationButton>
          </GeneralPagination>
          <PaginationEllipsis>...</PaginationEllipsis>
          <PaginationCurrent>
            {current}
            <A11yContent>{currentText}</A11yContent>
          </PaginationCurrent>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <GeneralPagination>
          <GeneralPaginationButton
            value="1"
            onClick={e => this.handleClick(e)}
            aria-label={`${goToText} 1`}
          >
            1
          </GeneralPaginationButton>
        </GeneralPagination>
        <PaginationEllipsis>...</PaginationEllipsis>
        <PaginationCurrent>
          {current}
          <A11yContent>{currentText}</A11yContent>
        </PaginationCurrent>
        <PaginationEllipsis>...</PaginationEllipsis>
        <GeneralPagination>
          <GeneralPaginationButton
            value={this.props.children && this.props.children.length}
            onClick={e => this.handleClick(e)}
            aria-label={`${goToText} ${this.props.children.length}`}
          >
            {this.props.children && this.props.children.length}
          </GeneralPaginationButton>
        </GeneralPagination>
      </React.Fragment>
    )
  }

  render() {
    const { children, copy, ...rest } = this.props
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
          <PaginationList>{this.mapTabs()}</PaginationList>
          <PaginationListMobile>{this.renderMobileTabs()}</PaginationListMobile>
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
   * The pagination panels. Must be at least one Pagination.Panel.
   */
  children: PropTypes.node.isRequired,
  /**
   * The default copy to be used.
   */
  copy: PropTypes.oneOf(['en', 'fr']),
}

Pagination.defaultProps = { copy: 'en' }

Pagination.Panel = Panel

export default Pagination
