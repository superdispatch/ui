import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiDialog).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiDialogTitle).toMatchInlineSnapshot(`
Object {
  "disableTypography": true,
}
`);
  expect(props.MuiDialogContent).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiDialogActions).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Dialog open={true}>
        <DialogTitle>Text</DialogTitle>
        <DialogContent />
        <DialogActions />
      </Dialog>,
      ['MuiDialog', 'MuiDialogTitle', 'MuiDialogContent', 'MuiDialogActions'],
    ),
  ).toMatchInlineSnapshot(`
@media print {
  .MuiDialog-root {
    position: absolute !important;
  }
}

.MuiDialog-scrollPaper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.MuiDialog-scrollBody {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
}

.MuiDialog-scrollBody:after {
  width: 0;
  height: 100%;
  content: '';
  display: inline-block;
  vertical-align: middle;
}

.MuiDialog-container {
  height: 100%;
  outline: 0;
}

@media print {
  .MuiDialog-container {
    height: auto;
  }
}

.MuiDialog-paper {
  margin: 32px;
  position: relative;
  overflow-y: auto;
}

@media print {
  .MuiDialog-paper {
    box-shadow: none;
    overflow-y: visible;
  }
}

.MuiDialog-paperScrollPaper {
  display: flex;
  max-height: calc(100% - 64px);
  flex-direction: column;
}

.MuiDialog-paperScrollBody {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}

.MuiDialog-paperWidthFalse {
  max-width: calc(100% - 64px);
}

.MuiDialog-paperWidthXs {
  max-width: 444px;
}

@media (max-width: 507.95px) {
  .MuiDialog-paperWidthXs.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthSm {
  max-width: 600px;
}

@media (max-width: 663.95px) {
  .MuiDialog-paperWidthSm.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthMd {
  max-width: 960px;
}

@media (max-width: 1023.95px) {
  .MuiDialog-paperWidthMd.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthLg {
  max-width: 1280px;
}

@media (max-width: 1343.95px) {
  .MuiDialog-paperWidthLg.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperWidthXl {
  max-width: 1920px;
}

@media (max-width: 1983.95px) {
  .MuiDialog-paperWidthXl.MuiDialog-paperScrollBody {
    max-width: calc(100% - 64px);
  }
}

.MuiDialog-paperFullWidth {
  width: calc(100% - 64px);
}

.MuiDialog-paperFullScreen {
  width: 100%;
  height: 100%;
  margin: 0;
  max-width: 100%;
  max-height: none;
  border-radius: 0;
}

.MuiDialog-paperFullScreen.MuiDialog-paperScrollBody {
  margin: 0;
  max-width: 100%;
}

.MuiDialogTitle-root {
  flex: 0 0 auto;
  margin: 0;
  padding: 16px 24px;
  font-size: 20px;
  font-family: SF Pro Display;
  font-weight: 500;
  line-height: 28px;
}

@media (min-width: 0px) and (max-width: 599.95px) {
  .MuiDialogTitle-root {
    font-size: 22px;
    line-height: 32px;
  }
}

.MuiDialogContent-root {
  flex: 1 1 auto;
  padding: 0px 24px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.MuiDialogContent-root:first-child {
  padding-top: 20px;
}

.MuiDialogContent-dividers {
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.MuiDialogActions-root {
  flex: 0 0 auto;
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: flex-end;
}

.MuiDialogActions-spacing > :not(:first-child) {
  margin-left: 16px;
}
`);
});
