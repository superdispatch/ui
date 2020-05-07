import { Avatar } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiAvatar).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(renderCSS(<Avatar />, ['MuiAvatar'])).toMatchInlineSnapshot(`
    .MuiAvatar-root {
      width: 40px;
      height: 40px;
      display: flex;
      overflow: hidden;
      position: relative;
      font-size: 14px;
      align-items: center;
      flex-shrink: 0;
      font-family: SF Pro Text;
      font-weight: 600;
      line-height: 20px;
      user-select: none;
      border-radius: 50%;
      text-transform: uppercase;
      justify-content: center;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiAvatar-root {
        font-size: 16px;
        line-height: 24px;
      }
    }

    @media (min-width: 600px) {
      .MuiAvatar-root {
        width: 32px;
        height: 32px;
      }
    }

    .MuiAvatar-colorDefault {
      color: Color.Grey300;
      background-color: Color.Silver300;
    }

    .MuiAvatar-rounded {
      border-radius: 4px;
    }

    .MuiAvatar-square {
      border-radius: 0;
    }

    .MuiAvatar-img {
      color: transparent;
      width: 100%;
      height: 100%;
      object-fit: cover;
      text-align: center;
      text-indent: 10000px;
    }

    .MuiAvatar-fallback {
      width: 75%;
      height: 75%;
    }
  `);
});
