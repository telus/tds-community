import styled from 'styled-components'
import { colorGreyGainsboro, colorTelusPurple, colorWhite, colorShark } from '@tds/core-colours'

export const StyledCard = styled.a`
  flex: 1;
  text-decoration: none;
  color: inherit;
  margin: 0;
  max-width: 30rem;
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
  @media (max-width: 414px) {
    max-width: 20rem;
  }
  @media (max-width: 320px) {
    max-width: 18rem;
  }
`

export const StyledLink = styled.a`
  margin: 0;
  text-decoration: none;
  color: inherit;
`

export const StyledTextBox = styled.div`
  margin: 0;
  padding: 0 1rem;
`

export const StyledInfoBox = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  @media (max-width: 414px) {
    padding: 1.5rem 0 2rem 0;
  }
  @media (max-width: 320px) {
    padding: 1.5rem 0 1rem 0;
  }
`

export const StyledType = styled.p`
  margin: 0;
  color: ${colorTelusPurple};
  font-size: 0.875rem;
`

export const StyledDate = styled.p`
  margin: 0;
  font-size: 0.875rem;
`

export const StyledHeading = styled.h2`
  margin: 0;
  font-size: 1.219rem;
  font-weight: 400;
  line-height: 1.4;
  color: ${colorShark};
`

export const StyledHeadingBox = styled.div`
  margin: 0;
  padding-bottom: 1.5rem;
  @media (max-width: 320px) {
    padding-bottom: 1rem;
  }
`

export const StyledIconBox = styled.div`
  margin: 0;
  padding-right: 0.5rem;
`

export const StyledImageContainer = styled.div``

export const StyledDescription = styled.p`
  margin: 0;
  font-size: 0.875rem;
  padding-bottom: 1.5rem;
  @media (max-width: 414px) {
    padding-bottom: 1rem;
  }
`

export const StyledIconTypeBox = styled.div`
  margin: 0;
  display: flex;
  border-bottom: 1px solid ${colorTelusPurple};
  padding-bottom: 1rem;
  @media (max-width: 414px) {
    padding-bottom: 0.5rem;
  }
`

export const StyledImage = styled.img`
  margin: 0;
  display: block;
  border-radius: 0 0 2px 2px;
  width: 100%;
`
