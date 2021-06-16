import styled from 'styled-components'
import { colorGreyGainsboro, colorTelusPurple, colorWhite } from '@tds/core-colours'

export const StyledCard = styled.div`
  background: ${colorWhite};
  border-radius: 3px;
  border: 1px solid ${colorGreyGainsboro};
  box-shadow: 0 0 16px #d8d8d8;
  transition: transform 0.4s;
  &:hover {
    transform: scale(103%);
    border: 2px solid ${colorTelusPurple};
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
`

export const StyledTextBox = styled.div`
  padding: 24px 16px;
`

export const StyledInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledType = styled.p`
  color: ${colorTelusPurple};
  font-size: 14px;
`

export const StyledDate = styled.p`
  font-size: 14px;
`

export const StyledHeading = styled.h2`
  font-size: 19.5px;
  font-weight: 400;
  line-height: 1.4;
`

export const StyledHeadingBox = styled.div`
  padding: 24px 0;
`

export const StyledIconBox = styled.div`
  padding-right: 8px;
`

export const StyledImageContainer = styled.div``

export const StyledDescription = styled.p`
  font-size: 14px;
`

export const StyledIconTypeBox = styled.div`
  display: flex;
  border-bottom: 1px solid ${colorTelusPurple};
  padding-bottom: 8px;
`

export const StyledImage = styled.img`
  display: block;
  border-radius: 0 0 3px 3px;
`
