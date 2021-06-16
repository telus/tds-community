import styled from 'styled-components'
import { colorGreyGainsboro, colorTelusPurple, colorWhite } from '@tds/core-colours'

export const StyledCard = styled.div`
  max-width: 29.188rem;
  min-height: 38.875rem;
  background: ${colorWhite};
  border-radius: 3px;
  border: 1px solid ${colorGreyGainsboro};
  box-shadow: 0 0 1rem #d8d8d8;
  transition: transform 0.4s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    transform: scale(103%);
    border: 0.125rem solid ${colorTelusPurple};
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`

export const StyledTextBox = styled.div`
  padding: 1.5rem 1rem;
`

export const StyledInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledType = styled.p`
  color: ${colorTelusPurple};
  font-size: 0.875rem;
`

export const StyledDate = styled.p`
  font-size: 0.875rem;
`

export const StyledHeading = styled.h2`
  font-size: 1.219rem;
  font-weight: 400;
  line-height: 1.4;
`

export const StyledHeadingBox = styled.div`
  padding: 1.5rem 0;
`

export const StyledIconBox = styled.div`
  padding-right: 0.5rem;
`

export const StyledImageContainer = styled.div``

export const StyledDescription = styled.p`
  font-size: 0.875rem;
`

export const StyledIconTypeBox = styled.div`
  display: flex;
  border-bottom: 1px solid ${colorTelusPurple};
  padding-bottom: 8px;
`

export const StyledImage = styled.img`
  display: block;
  border-radius: 0 0 2px 2px;
`
