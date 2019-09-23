// import { IconButton, SnackbarContent } from '@material-ui/core';
// import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
// import { CheckCircle, Close, SvgIconComponent, Warning } from '@material-ui/icons';
// import clsx from 'clsx';
// import { useSnackbar } from 'notistack';
// import React, { forwardRef, ReactNode, useEffect } from 'react';
// import { useEventCallback } from 'utility-hooks';

// import { NotificationClassNames } from './NotificationStyles';

// export type NotificationVariant = 'default' | 'error' | 'success';

// export interface NotificationOptions {
//   detached?: boolean;
//   onClose?: () => void;
//   showCloseButton?: boolean;
//   autoHideDuration?: number;
//   variant?: NotificationVariant;
// }

// const NotificationMessage = forwardRef(
//   (
//     {
//       variant,
//       message,
//       onClose,
//       className,
//       showCloseButton,
//       ...props
//     }: NotificationOptions & SnackbarContentProps,
//     ref,
//   ) => {
//     const Icon = (variant && notificationIcon[variant]) || notificationIcon.default;
//
//     return (
//       <SnackbarContent
//         {...props}
//         ref={ref}
//         className={clsx(
//           variant === 'success'
//             ? NotificationClassNames.Success
//             : variant === 'error'
//             ? NotificationClassNames.Error
//             : NotificationClassNames.Default,
//           className,
//         )}
//         message={
//           <>
//
//
//             <span>{message}</span>
//           </>
//         }
//         action={
//           <>
//             {onClose && showCloseButton && (

//             )}
//           </>
//         }
//       />
//     );
//   },
// );
//
// NotificationMessage.displayName = 'NotificationMessage';
//
// export function useNotification(
//   render: () => ReactNode,
//   { variant, onClose, showCloseButton = true, autoHideDuration = 0 }: NotificationOptions = {},
// ) {
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const shouldShowCloseButton = showCloseButton && onClose != null;
//   const children = useEventCallback(render);
//   const handleClose = useEventCallback((...args: any[]) => {
//     console.log(args);
//
//     if (onClose) {
//       onClose();
//     }
//   });
//
//   useEffect(() => {
//     const key = enqueueSnackbar('', {
//       onClose: handleClose,
//       persist: !autoHideDuration,
//       autoHideDuration: !autoHideDuration ? undefined : autoHideDuration,
//       anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
//
//       // eslint-disable-next-line react/display-name
//       children: () => (
//         <NotificationMessage
//           variant={variant}
//           message={children()}
//           onClose={handleClose}
//           showCloseButton={shouldShowCloseButton}
//         />
//       ),
//     });
//
//     return () => {
//       if (key) {
//         closeSnackbar(key);
//       }
//     };
//   }, [
//     variant,
//     children,
//     handleClose,
//     closeSnackbar,
//     enqueueSnackbar,
//     showCloseButton,
//     autoHideDuration,
//     shouldShowCloseButton,
//   ]);
// }

// export interface NotificationProps extends NotificationOptions {
//   render: () => ReactNode;
// }

// export function Snackbar({ render, ...options }: NotificationProps) {
//   useNotification(render, options);
//
//   return null;
// }

import {
  IconButton,
  Snackbar as MaterialSnackbar,
  SnackbarContent as MaterialSnackbarContent,
} from '@material-ui/core';
import { SnackbarProps as MaterialSnackbarProps } from '@material-ui/core/Snackbar';
import { SnackbarContentProps as MaterialSnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { CheckCircle, Close, SvgIconComponent, Warning } from '@material-ui/icons';
import clsx from 'clsx';
import { Omit, useSnackbar } from 'notistack';
import React, { forwardRef, ReactNode, useCallback, useMemo } from 'react';
import { useEventCallback } from 'utility-hooks';

import { SnackbarClassNames } from './SnackbarStyles';

export type SnackbarVariant = 'default' | 'error' | 'success';

const iconVariant: Record<SnackbarVariant, undefined | SvgIconComponent> = {
  default: undefined,
  error: Warning,
  success: CheckCircle,
};

export type SnackbarCloseReason = 'timeout' | 'explicit';

interface CommonSnackbarProps {
  children: ReactNode;
  hasCloseButton?: boolean;
  variant?: SnackbarVariant;
  onClose?: (reason: SnackbarCloseReason) => void;
}

export type SnackbarContentProps = CommonSnackbarProps &
  Omit<MaterialSnackbarContentProps, 'message'>;

const SnackbarContent = forwardRef(
  (
    {
      action,
      variant,
      children,
      onClose,
      className,
      hasCloseButton = onClose != null,
      ...props
    }: SnackbarContentProps,
    ref,
  ) => {
    const Icon = (variant && iconVariant[variant]) || iconVariant.default;

    return (
      <MaterialSnackbarContent
        {...props}
        ref={ref}
        className={clsx(
          variant === 'error'
            ? SnackbarClassNames.Error
            : variant === 'success'
            ? SnackbarClassNames.Success
            : SnackbarClassNames.Default,
          className,
        )}
        message={
          <>
            {Icon && <Icon className={SnackbarClassNames.Icon} />}
            {children}
          </>
        }
        action={
          !action && !hasCloseButton ? null : (
            <>
              {action}
              {hasCloseButton && (
                <IconButton color="inherit" onClick={onClose && (() => onClose('explicit'))}>
                  <Close />
                </IconButton>
              )}
            </>
          )
        }
      />
    );
  },
);

SnackbarContent.displayName = 'SnackbarContent';

export type SnackbarProps = CommonSnackbarProps &
  Omit<MaterialSnackbarProps, 'onClose' | 'message'>;

export function Snackbar({
  action,
  variant,
  onClose,
  children,
  hasCloseButton,
  ...props
}: SnackbarProps) {
  const handleClose = useEventCallback((_, reason: string) => {
    if (onClose && reason !== 'clickaway') {
      onClose(reason === 'timeout' ? 'timeout' : 'explicit');
    }
  });

  return (
    <MaterialSnackbar {...props} onClose={handleClose}>
      <SnackbarContent
        action={action}
        variant={variant}
        onClose={onClose}
        hasCloseButton={hasCloseButton}
      >
        {children}
      </SnackbarContent>
    </MaterialSnackbar>
  );
}

export type AddSnackbarOptions = Omit<SnackbarProps, 'open' | 'classes' | 'children'>;

export interface SnackbarAPI {
  addSnackbar: (message: ReactNode, options?: AddSnackbarOptions) => () => void;
}

export function useSnackbarAPI(): SnackbarAPI {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const addSnackbar = useCallback(
    (
      message: ReactNode,
      { variant, onClose, hasCloseButton, autoHideDuration, ...options }: AddSnackbarOptions = {},
    ) => {
      const key = enqueueSnackbar('', {
        ...options,
        autoHideDuration: autoHideDuration || 5000,
        onClose: () => {
          if (onClose) {
            onClose('explicit');
          }
        },
        // eslint-disable-next-line react/display-name
        children: () => (
          <SnackbarContent
            variant={variant}
            hasCloseButton={hasCloseButton}
            onClose={() => {
              if (key) {
                closeSnackbar(key);
              }

              if (onClose) {
                onClose('explicit');
              }
            }}
          >
            {message}
          </SnackbarContent>
        ),
      });

      return () => key && closeSnackbar(key);
    },
    [closeSnackbar, enqueueSnackbar],
  );

  return useMemo(() => ({ addSnackbar }), [addSnackbar]);
}
