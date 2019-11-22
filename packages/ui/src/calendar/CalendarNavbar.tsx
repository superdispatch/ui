import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';
import { NavbarElementProps } from 'react-day-picker';

export function CalendarNavbar({
  labels,
  classNames,
  onNextClick,
  onPreviousClick,
  showNextButton,
  showPreviousButton,
}: NavbarElementProps) {
  return (
    <>
      <IconButton
        size="small"
        color="primary"
        disabled={!showPreviousButton}
        onClick={() => onPreviousClick()}
        aria-label={labels.previousMonth}
        className={classNames.navButtonPrev}
      >
        <ChevronLeft color="action" />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        disabled={!showNextButton}
        onClick={() => onNextClick()}
        aria-label={labels.nextMonth}
        className={classNames.navButtonNext}
      >
        <ChevronRight color="action" />
      </IconButton>
    </>
  );
}
