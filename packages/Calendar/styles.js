import styled from 'styled-components'

const theme = {
  colors: {
    telusPurple: '#4B286D',
    shark: '#2A2C2E',
    shuttleGrey: '#54595F',
    white: '#FFF',
    gainsboro: '#D8D8D8',
  },
  fontWeights: {
    thin: 300,
    light: 400,
    roman: 500,
    medium: 700,
  },
  breakPoints: {
    xs: '576px',
    sm: '769px',
    md: '993px',
    lg: '1200px',
  },
}

export const CalendarContainer = styled.div`
  .SingleDatePicker,
  .SingleDatePickerInput {
    display: block;
  }

  .SingleDatePicker_picker {
    box-shadow: none;
    border: 1px solid ${theme.colors.shuttleGrey};
    border-radius: 4px;
    z-index: 3;
  }

  .DateInput {
    width: 100%;
  }

  .SingleDatePickerInput__withBorder {
    border: 0;
  }

  .DateInput_input {
    padding: 0.5rem 1rem;
    border: 1px solid ${theme.colors.shuttleGrey};
    border-radius: 4px;
    min-height: 3.25rem;
    color: ${theme.colors.shuttleGrey};
    font-weight: ${theme.fontWeights.roman};
    font-size: 1rem;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
  }

  .DateInput_fang {
    transform: translateY(2px);
    z-index: 4;
  }

  .DateInput_fangStroke {
    stroke: ${theme.colors.shuttleGrey};
  }

  .CalendarMonth_caption {
    font-weight: ${theme.fontWeights.medium};
    padding-bottom: 48px;
  }

  .DayPicker__withBorder {
    box-shadow: none;
  }

  .DayPickerNavigation_button {
    border: 1px solid ${theme.colors.shark};
    border-radius: 2px;
    position: absolute;
    top: 18px;
    line-height: 0.78;
    padding: 7px 17px;
    cursor: pointer;
    user-select: none;
    &:nth-child(1) {
      left: 22px;
    }
    &:nth-child(2) {
      right: 22px;
      i {
        font-family: 'TELUS Core Icons';
        display: inline-block;
        font-weight: normal;
        font-style: normal;
        speak: none;
        text-decoration: inherit;
        text-transform: none;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1;
        vertical-align: middle;
        &:before {
          content: '\\F107';
          display: inline-block;
        }
      }
    }
  }

  .DayPickerNavigation_button__default:focus,
  .DayPickerNavigation_button__default:hover {
    border: 1px solid ${theme.colors.gainsboro};
  }

  .DayPickerNavigation_svg__horizontal {
    fill: ${theme.colors.shark};
  }

  .DayPicker_weekHeader {
    color: ${theme.colors.shark};
  }

  .CalendarDay__default {
    position: relative;
    border: 1px solid ${theme.colors.gainsboro};
    vertical-align: middle;
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.shark};
    text-decoration: underline;
    transition: all 0.3s;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 1.9rem;
      width: 1.9rem;
      border-radius: 50%;
      background: transparent;
      transition: all 0.3s;
      z-index: -1;
      @media screen and (min-width: ${theme.breakPoints.md}) {
        height: 2.25rem;
        width: 2.25rem;
      }
    }
  }

  .CalendarDay__default:hover,
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: none;
    border: 1px solid ${theme.colors.gainsboro};
    z-index: 0;
    text-decoration: underline;
    &:before {
      background: ${theme.colors.gainsboro};
    }
  }

  .CalendarDay__default.CalendarDay__selected,
  .CalendarDay__default.CalendarDay__selected:active
    .CalendarDay__default.CalendarDay__selected:hover {
    color: ${theme.colors.white};
    text-decoration: none;
    &:before {
      background: ${theme.colors.telusPurple};
    }
  }

  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover,
  .CalendarDay__blocked_calendar,
  .CalendarDay__blocked_calendar:active,
  .CalendarDay__blocked_calendar:hover {
    font-weight: ${theme.fontWeights.light};
    background: ${theme.colors.white};
    color: ${theme.colors.shuttleGrey};
    text-decoration: none;
    &:before {
      content: none;
    }
  }
`

export const LabelText = styled.div`
  margin-bottom: 0.5rem;
  font-weight: ${theme.fontWeights.medium};
`

export default {
  CalendarContainer,
  LabelText,
}
