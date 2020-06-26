import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Box from '@tds/core-box'
import Link from '@tds/core-link'
import Image from '@tds/core-image'
import Paragraph from '@tds/core-paragraph'
import { media } from '@tds/core-responsive'
import { colorGreyGainsboro } from '@tds/core-colours'

import { safeRest } from '@tds/util-helpers'

const StyledLogoRow = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  ...media.from('lg').css({
    'div:not(:last-child)': {
      borderRight: `1px solid ${colorGreyGainsboro}`,
    },
    'div:nth-of-type(6n)': {
      borderRight: '0px',
    },
  }),
  ...media
    .from('sm')
    .until('lg')
    .css({
      '> div:nth-of-type(1):nth-of-last-child(3)': {
        borderBottom: '5px solid black',
      },
      'div:nth-of-type(3n - 1)': {
        borderLeft: `1px solid ${colorGreyGainsboro}`,
        borderRight: `1px solid ${colorGreyGainsboro}`,
      },
      'div:nth-of-type(3n - 1):last-child': {
        borderLeft: `1px solid ${colorGreyGainsboro}`,
      },
      '> div:not(:last-child)': {
        borderBottom: `1px solid ${colorGreyGainsboro}`,
      },
      'div:nth-last-of-type(-n+3):nth-of-type(3n) ~ *': {
        borderBottom: `1px solid ${colorGreyGainsboro}`,
        '&:last-child': {
          borderRight: '0px',
        },
      },
      'div:nth-last-of-type(-n+4):nth-of-type(3n) ~ *': {
        borderBottom: '0px',
      },
    }),
  ...media.until('sm').css({
    'div:nth-of-type(even)': {
      borderLeft: `1px solid ${colorGreyGainsboro}`,
    },
    '> div:not(:last-child)': {
      borderBottom: `1px solid ${colorGreyGainsboro}`,
    },
    '> div:nth-last-of-type(-n+2):not(:nth-of-type(even))': {
      borderBottom: '0px',
    },
  }),
})

const StyledLogoWrapper = styled('div')({
  flexDirection: 'column',
  ...media.until('sm').css({
    flex: '0 1 50%',
    width: '50%',
    alignItems: 'center',
    paddingBottom: '16px',
    '~ div:nth-of-type(n + 3)': {
      paddingTop: '16px',
    },
    '~ div:nth-last-of-type(-n + 2)': {
      paddingBottom: '0px',
    },
  }),
  ...media
    .from('sm')
    .until('lg')
    .css({
      flex: '0 1 33%',
      width: '33%',
      paddingBottom: '16px',
      '~ :nth-of-type(n + 4)': {
        paddingTop: '16px',
        paddingBottom: '0px',
      },
    }),
  ...media.from('lg').css({
    flex: '0 1 16%',
    width: '16%',
  }),
})

const StyledCentre = styled('div')({
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

/**
 * The WaffleGrid is used to show items in a waffle like manner with borders surrounding the element
 * @version ./package.json
 * @visibleName WaffleGrid (beta)
 */
const WaffleGrid = ({ items, ...rest }) => (
  <Box between={5} {...safeRest(rest)}>
    <StyledCentre>
      <StyledLogoRow inline between={0}>
        {items.map(child => (
          <StyledLogoWrapper key={child}>
            <StyledCentre>
              <Link href={child.href}>
                <Image src={child.image} alt={child.imageAltText} width={56} height={56} />
                <Paragraph align="center">{child.text}</Paragraph>
              </Link>
            </StyledCentre>
          </StyledLogoWrapper>
        ))}
      </StyledLogoRow>
    </StyledCentre>
  </Box>
)

WaffleGrid.propTypes = {
  /**
   * The image and the link to display. `items` should be an array of objects with the following keys:
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The src attribute for the HTML img element
       */
      image: PropTypes.string,
      /**
       * The alt attribute for the HTML img element
       */
      imageAltText: PropTypes.string,
      /**
       * The text displayed under the image
       */
      text: PropTypes.string,
      /**
       * Target URL
       */
      href: PropTypes.string,
    })
  ).isRequired,
}

export default WaffleGrid
