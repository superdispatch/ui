import { Color } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type ButtonColorProp = 'default' | 'primary' | 'critical' | 'inverted';
export type ButtonSizeProp = 'small' | 'medium' | 'large';
export type ButtonVariantProp = 'contained' | 'outlined' | 'text';

interface ButtonStyleProps {
  disabled: boolean;
  buttonActive: boolean;
  buttonLoading: boolean;

  size: ButtonSizeProp;
  variant: ButtonVariantProp;
  buttonColor: ButtonColorProp;
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
  borderColor: Color;
  outlineColor: Color;
  backgroundColor: Color;
  backgroundColorActive: Color;
}

function getButtonVariables({ size }: ButtonStyleProps): ButtonVariables {
  return {
    textColor: Color.Transparent,
    borderColor: Color.Transparent,
    outlineColor: Color.Transparent,
    backgroundColor: Color.Transparent,
    backgroundColorActive: Color.Transparent,

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

function getContainedButtonVariables(props: ButtonStyleProps): ButtonVariables {
  const { buttonColor, disabled, buttonLoading } = props;
  const variables = getButtonVariables(props);

  const [
    backgroundColor,
    outlineColor,
    backgroundColorActive,
    disabledTextColor = Color.White,
    disabledBackgroundColor,
  ] =
    buttonColor === 'critical'
      ? [Color.Red300, Color.Red100, Color.Red500, undefined, Color.Red100]
      : buttonColor === 'inverted'
      ? [
          Color.White20,
          Color.White40,
          Color.White40,
          Color.White50,
          Color.White08,
        ]
      : [Color.Blue300, Color.Blue100, Color.Blue500, undefined, Color.Blue100];

  return {
    ...variables,
    outlineColor,
    backgroundColorActive,
    textColor: disabled && !buttonLoading ? disabledTextColor : Color.White,
    backgroundColor:
      disabled && !buttonLoading ? disabledBackgroundColor : backgroundColor,
  };
}

const ButtonRoot = styled.button<ButtonStyleProps>((props) => {
  const { theme, variant, disabled } = props;
  const variables =
    variant === 'contained'
      ? getContainedButtonVariables(props)
      : getButtonVariables(props);

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

    color: ${variables.textColor};
    background-color: ${variables.backgroundColor};

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
    box-shadow: inset 0 0 0 1px ${variables.borderColor},
      0 0 0 0 ${variables.outlineColor};

    ${!disabled &&
    css`
      &:active {
        opacity: 0.9;
      }

      &:focus {
        box-shadow: inset 0 0 0 1px ${variables.borderColor},
          0 0 0 2px ${variables.outlineColor};
      }

      &[aria-expanded='true'] {
        background-color: ${variables.backgroundColorActive};
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: ${variables.backgroundColorActive};
        }
      }
    `}
  `;
});

const ButtonLabel = styled.span`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
`;

const ButtonStartIcon = styled.span`
  margin-right: 4px;
`;

const ButtonEndIcon = styled.span`
  margin-left: 4px;
`;

export interface ButtonProps {
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;

  size?: ButtonSizeProp;
  color?: ButtonColorProp;
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
      loading = false,
      disabled: disabledProp = false,

      size = 'medium',
      color = 'default',
      variant = 'outlined',
    },
    ref,
  ) => {
    const disabled = loading || disabledProp;
    const tabIndex = disabled ? -0 : tabIndexProp;
    const styleProps: ButtonStyleProps = {
      disabled,
      buttonActive: active,
      buttonLoading: loading,

      size,
      variant,
      buttonColor: color,
    };

    return (
      <ButtonRoot
        {...styleProps}
        ref={ref}
        type={type}
        tabIndex={tabIndex}
        aria-busy={loading}
        aria-expanded={active}
        aria-disabled={disabled}
      >
        <ButtonLabel>
          {!!startIcon && <ButtonStartIcon>{startIcon}</ButtonStartIcon>}
          {children}
          {!!endIcon && <ButtonEndIcon>{endIcon}</ButtonEndIcon>}
        </ButtonLabel>
      </ButtonRoot>
    );
  },
);
