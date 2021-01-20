import { CircularProgress } from '@material-ui/core';
import { Color } from '@superdispatch/ui';
import { AriaAttributes, forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type ButtonSizeProp = 'small' | 'medium' | 'large';
export type ButtonVariantProp =
  | 'default'
  | 'primary'
  | 'neutral'
  | 'critical'
  | 'inverted';

interface ButtonStyleProps {
  pending: boolean;
  disabled: boolean;
  buttonActive: boolean;

  size: ButtonSizeProp;
  variant: ButtonVariantProp;
}

interface ButtonVariables {
  fontSize: number;
  fontSizeMobile: number;
  lineHeight: number;
  lineHeightMobile: number;

  paddingX: number;
  paddingXMobile: number;
  paddingY: number;
  paddingYMobile: number;

  textColor: Color;
  textColorHovered: Color;
  borderColor: Color;
  borderColorHovered: Color;
  outlineColor: Color;
  backgroundColor: Color;
  backgroundColorHovered: Color;
}

function getDefaultVariables({
  size,
  disabled,
}: ButtonStyleProps): ButtonVariables {
  return {
    textColor: Color.White,
    borderColor: Color.Transparent,
    outlineColor: Color.Blue100,
    backgroundColor: disabled ? Color.Blue100 : Color.Blue300,

    textColorHovered: Color.White,
    borderColorHovered: Color.Transparent,
    backgroundColorHovered: Color.Blue500,

    fontSize: size === 'large' ? 16 : 14,
    lineHeight: size === 'large' ? 24 : 20,
    fontSizeMobile: size === 'large' ? 18 : 16,
    lineHeightMobile: size === 'large' ? 28 : 24,

    paddingX: size === 'large' ? 32 : 16,
    paddingY: size === 'large' ? 8 : size === 'small' ? 2 : 6,
    paddingXMobile: size === 'large' ? 64 : 24,
    paddingYMobile: size === 'large' ? 14 : size === 'small' ? 4 : 10,
  };
}

function getPrimaryVariables(props: ButtonStyleProps): ButtonVariables {
  return getDefaultVariables(props);
}

function getNeutralVariables(props: ButtonStyleProps): ButtonVariables {
  const { disabled } = props;
  const variables = getDefaultVariables(props);

  variables.textColor = disabled ? Color.Silver500 : Color.Grey500;
  variables.borderColor = Color.Silver500;
  variables.backgroundColor = Color.White;

  variables.textColorHovered = Color.Blue300;
  variables.borderColorHovered = Color.Blue300;
  variables.backgroundColorHovered = Color.Blue50;

  return variables;
}

const ButtonRoot = styled.button<ButtonStyleProps>((props) => {
  const { theme, pending, variant, disabled } = props;
  const variables =
    variant === 'primary'
      ? getPrimaryVariables(props)
      : variant === 'neutral'
      ? getNeutralVariables(props)
      : variant === 'critical'
      ? getPrimaryVariables(props)
      : variant === 'inverted'
      ? getPrimaryVariables(props)
      : getDefaultVariables(props);

  //

  return css`
    /* Reset button styles */
    border: 0;
    margin: 0;
    outline: 0;
    position: relative;
    vertical-align: middle;

    /* Fixes for the anchor element */
    cursor: pointer;
    text-decoration: none;

    &[disabled],
    &[aria-disabled='true'] {
      cursor: default;
      /* Disable link interactions */
      pointer-events: none;
    }

    /* Firefox fixes */
    -moz-appearance: none;

    &::-moz-focus-inner {
      /* Remove Firefox dotted outline */
      border-style: none;
    }

    /* Webkit fixes */
    -webkit-appearance: none;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    @media print {
      -webkit-print-color-adjust: exact;
    }

    /* Button styles */
    --button-visibility: ${pending ? 'hidden' : 'visible'};

    --button-text-color: ${variables.textColor};
    --button-border-color: ${variables.borderColor};
    --button-outline-color: ${Color.Transparent};
    --button-background-color: ${variables.backgroundColor};

    --button-padding-x: ${variables.paddingXMobile}px;
    --button-padding-y: ${variables.paddingYMobile}px;
    --button-font-size: ${variables.fontSizeMobile}px;
    --button-line-height: ${variables.lineHeightMobile}px;

    ${theme.breakpoints.up('sm')} {
      --button-padding-x: ${variables.paddingX}px;
      --button-padding-y: ${variables.paddingY}px;
      --button-font-size: ${variables.fontSize}px;
      --button-line-height: ${variables.lineHeight}px;
    }

    --mui-svg-icon-size: var(--button-line-height);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    color: var(--button-text-color);
    background-color: var(--button-background-color);

    font-family: ${theme.typography.fontFamily};
    font-weight: ${theme.typography.fontWeightBold};

    border-radius: 4px;
    font-size: var(--button-font-size);
    line-height: var(--button-line-height);
    padding: var(--button-padding-y) var(--button-padding-x);

    transition: ${theme.transitions.create([
      'color',
      'box-shadow',
      'background-color',
    ])};

    transform: scale(1);
    box-shadow: inset 0 0 0 1px var(--button-border-color),
      0 0 0 2px var(--button-outline-color);

    ${!disabled &&
    css`
      &:active {
        opacity: 0.9;
      }

      &:focus {
        --button-outline-color: ${variables.outlineColor};
      }

      &[aria-expanded='true'] {
        --button-text-color: ${variables.textColorHovered};
        --button-border-color: ${variables.borderColorHovered};
        --button-background-color: ${variables.backgroundColorHovered};
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          --button-text-color: ${variables.textColorHovered};
          --button-border-color: ${variables.borderColorHovered};
          --button-background-color: ${variables.backgroundColorHovered};
        }
      }
    `}
  `;
});

const ButtonLabel = styled.span`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  visibility: var(--button-visibility);
`;

const ButtonStartIcon = styled.span`
  margin-right: 4px;
`;

const ButtonEndIcon = styled.span`
  margin-left: 4px;
`;

const ButtonPendingIndicator = styled.span`
  left: 50%;
  display: flex;
  position: absolute;
  visibility: visible;
  transform: translate(-50%);
`;

export interface ButtonProps
  extends Pick<
    AriaAttributes,
    'aria-label' | 'aria-controls' | 'aria-haspopup' | 'aria-labelledby'
  > {
  active?: boolean;
  pending?: boolean;
  disabled?: boolean;

  size?: ButtonSizeProp;
  variant?: ButtonVariantProp;

  children?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  tabIndex?: number;
  type?: 'button' | 'submit';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,

      endIcon,
      startIcon,

      type = 'button',
      tabIndex: tabIndexProp = 0,

      active = false,
      pending = false,
      disabled: disabledProp = false,

      size = 'medium',
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const disabled = pending || disabledProp;
    const tabIndex = disabled ? -0 : tabIndexProp;
    const styleProps: ButtonStyleProps = {
      size,
      variant,
      pending,
      disabled,
      buttonActive: active,
    };

    return (
      <ButtonRoot
        {...props}
        {...styleProps}
        ref={ref}
        type={type}
        tabIndex={tabIndex}
        aria-busy={pending}
        aria-expanded={active}
        aria-disabled={disabled}
      >
        <ButtonLabel>
          {!!startIcon && <ButtonStartIcon>{startIcon}</ButtonStartIcon>}
          {children}
          {!!endIcon && <ButtonEndIcon>{endIcon}</ButtonEndIcon>}

          {pending && (
            <ButtonPendingIndicator>
              <CircularProgress size="1em" color="inherit" />
            </ButtonPendingIndicator>
          )}
        </ButtonLabel>
      </ButtonRoot>
    );
  },
);
