import { CircularProgress, SvgIcon } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { mdiUpload } from '@mdi/js';
import { CardButton, Color, Inline } from '@superdispatch/ui';
import { forwardRef, lazy, ReactElement, ReactNode, Suspense } from 'react';
import { FileRejection } from 'react-dropzone';
import styled from 'styled-components';

export function toBytes(input: number, unit: 'kb' | 'mb' | 'gb'): number {
  if (unit === 'gb') return input * (1 << 30);
  if (unit === 'mb') return input * (1 << 20);
  return input * (1 << 10);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const kilobyte = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(kilobyte));
  const unit = units[unitIndex];
  return `${(bytes / Math.pow(kilobyte, unitIndex)).toFixed(2)} ${unit}`;
}

const StyledCardButton = styled(CardButton)<{
  status?: 'idle' | 'active' | 'error';
}>(({ status }) => ({
  backgroundColor: status === 'active' ? Color.Blue50 : undefined,
}));

const Dropzone = lazy(() => import('react-dropzone'));

interface UploadRejectionProps {
  maxSize?: number;
  maxFiles?: number;
  accept?: string | string[];
  rejection: FileRejection;
}

function UploadRejection({
  maxSize,
  rejection,
}: UploadRejectionProps): null | ReactElement {
  if (rejection.errors.length === 0) {
    return null;
  }

  const [error] = rejection.errors;

  return (
    <Inline noWrap={true} verticalAlign="center">
      <Error />
      <span>
        {error.code === 'file-too-large'
          ? maxSize == null
            ? 'Attachment size is too large'
            : `Attachment size should be less than ${formatBytes(maxSize)}`
          : error.message}
      </span>
    </Inline>
  );
}

export interface UploadCardButtonProps {
  children?: ReactNode;
  startIcon?: ReactNode;
  hintText?: ReactNode;
  fallback?: ReactNode;
  disabled?: boolean;

  maxSize?: number;
  accept?: string | string[];
  onDropAccepted?: (files: File[]) => void;
  onDropRejected?: (fileRejections: FileRejection[]) => void;
}

export const FileDropZone = forwardRef<
  HTMLButtonElement,
  UploadCardButtonProps
>((props, ref) => {
  const {
    // CardButton
    disabled = false,
    children = 'Upload Attachments',
    hintText = 'or Drag & Drop files',
    startIcon = (
      <SvgIcon>
        <path d={mdiUpload} />
      </SvgIcon>
    ),
    fallback = (
      <CardButton
        ref={ref}
        disabled={true}
        startIcon={<CircularProgress size="1em" color="inherit" />}
      >
        Loading dependencies…
      </CardButton>
    ),

    // Dropzone
    accept,
    maxSize = Infinity,
    onDropRejected,
    onDropAccepted,
    ...dropzoneProps
  } = props;

  return (
    <Suspense fallback={fallback}>
      <Dropzone
        {...dropzoneProps}
        accept={accept}
        maxSize={maxSize}
        disabled={disabled}
        onDropAccepted={(files) => {
          onDropAccepted?.(files);
        }}
        onDropRejected={(fileRejections) => {
          onDropRejected?.(fileRejections);
        }}
      >
        {({
          isDragActive,
          isDragReject,
          getRootProps,
          getInputProps,
          fileRejections,
        }) => {
          return (
            <>
              <input {...getInputProps()} />

              <StyledCardButton
                {...getRootProps()}
                ref={ref}
                hint={hintText}
                disabled={disabled}
                startIcon={startIcon}
                status={
                  isDragActive ? 'active' : isDragReject ? 'error' : 'idle'
                }
                error={
                  !!fileRejections.length && (
                    <UploadRejection
                      accept={accept}
                      maxSize={maxSize}
                      rejection={fileRejections[0]}
                    />
                  )
                }
              >
                {children}
              </StyledCardButton>
            </>
          );
        }}
      </Dropzone>
    </Suspense>
  );
});
