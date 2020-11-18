import { Link } from '@material-ui/core';
import { Launch } from '@material-ui/icons';
import { Inline } from '@superdispatch/ui';
import React, { ReactElement } from 'react';

export interface PropsLinkProps {
  url: string;
}

export function PropsLink({ url }: PropsLinkProps): ReactElement {
  return (
    <Link
      href={url}
      target="_blank"
      color="textSecondary"
      rel="noopener noreferrer"
    >
      <Inline verticalAlign="center">
        <span>Component API</span>
        <Launch fontSize="inherit" />
      </Inline>
    </Link>
  );
}
