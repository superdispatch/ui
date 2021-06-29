import { CircularProgress, SvgIcon } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { mdiUpload } from '@mdi/js';
import { CardButton, Color, Column, Columns } from '@superdispatch/ui';
import { forwardRef, ReactElement, ReactNode, Suspense } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import styled from 'styled-components';

export function toBytes(input: number, unit: 'kb' | 'mb' | 'gb'): number {
  if (unit === 'gb') return input * (1 << 30);
  if (unit === 'mb') return input * (1 << 20);
  return input * (1 << 10);
}

const KILOBYTE = 1024;
const BYTE_UNITS = [
  'B',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
] as const;
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));
  const unit = BYTE_UNITS[unitIndex] as string;
  return `${(bytes / Math.pow(KILOBYTE, unitIndex)).toFixed(2)} ${unit}`;
}

const StyledCardButton = styled(CardButton)<{
  status?: 'idle' | 'active' | 'error';
}>(({ status }) => ({
  backgroundColor: status === 'active' ? Color.Blue50 : undefined,
}));

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
  const [error] = rejection.errors;
  if (!error) return null;

  return (
    <Columns align="center">
      <Column width="content">
        <Error />
      </Column>

      <Column>
        {error.code === 'file-too-large'
          ? maxSize == null
            ? 'Attachment size is too large'
            : `Attachment size should be less than ${formatBytes(maxSize)}`
          : error.message}
      </Column>
    </Columns>
  );
}

export interface FileDropZoneProps {
  children?: ReactNode;
  startIcon?: ReactNode;
  hintText?: ReactNode;
  fallback?: ReactNode;
  disabled?: boolean;

  maxSize?: number;
  maxFiles?: number;
  accept?: string | string[];
  onDropAccepted?: (files: File[]) => void;
  onDropRejected?: (fileRejections: FileRejection[]) => void;
}

export const FileDropZone = forwardRef<HTMLButtonElement, FileDropZoneProps>(
  (props, ref) => {
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
      maxFiles = Infinity,
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
          maxFiles={maxFiles}
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
            fileRejections: [fileRejection],
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
                    !!fileRejection && (
                      <UploadRejection
                        accept={accept}
                        maxSize={maxSize}
                        rejection={fileRejection}
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
  },
);
