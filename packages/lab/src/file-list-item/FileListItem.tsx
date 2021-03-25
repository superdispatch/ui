import {
  CircularProgress,
  IconButton,
  Link,
  SvgIcon,
  SvgIconProps,
  Tooltip,
} from '@material-ui/core';
import { CheckCircle, Delete, Error, Image, Refresh } from '@material-ui/icons';
import { mdiPdfBox, mdiTextBox } from '@mdi/js';
import {
  Color,
  Column,
  Columns,
  useResponsiveValue,
  useUID,
} from '@superdispatch/ui';
import { forwardRef, memo, ReactNode, useState } from 'react';
import styled from 'styled-components';

const FileListItemName = styled.div`
  overflow: hidden;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FileListItemProgress = styled(CircularProgress)`
  font-size: 24px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 14px;
  }
`;

const PdfIcon = memo((props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d={mdiPdfBox} />
  </SvgIcon>
));
const TextBoxIcon = memo((props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path d={mdiTextBox} />
  </SvgIcon>
));

type FileType = 'pdf' | 'image' | 'unknown';
const PDF_FILE_PATTERN = /\.pdf$/;
const IMAGE_FILE_PATTERN = /\.(gif|png|jpg|jpeg)$/;

function getFileType(name: string): FileType {
  if (PDF_FILE_PATTERN.exec(name)) return 'pdf';
  if (IMAGE_FILE_PATTERN.exec(name)) return 'image';
  return 'unknown';
}

export interface FileListItemProps {
  url?: string;
  name: string;
  onRetry?: () => void;
  onDelete?: () => void;
  helperText?: ReactNode;
  status?: 'idle' | 'loading' | 'error' | 'success';
}
export const FileListItem = forwardRef<HTMLDivElement, FileListItemProps>(
  ({ url, name, status, onRetry, onDelete }, ref) => {
    const uid = useUID();
    const fileType = getFileType(name);
    const [isHoveredState, setIsHovered] = useState(false);
    const isHovered = useResponsiveValue(true, isHoveredState);

    return (
      <div
        ref={ref}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <Columns align="center" space="xsmall">
          <Column width="content">
            {status === 'error' ? (
              <Error color="error" fontSize="small" />
            ) : fileType === 'pdf' ? (
              <PdfIcon color="action" fontSize="small" />
            ) : fileType === 'image' ? (
              <Image color="action" fontSize="small" />
            ) : (
              <TextBoxIcon color="action" fontSize="small" />
            )}
          </Column>

          <Column width="fluid">
            <FileListItemName id={uid}>
              {!url ? (
                name
              ) : (
                <Link
                  href={url}
                  noWrap={true}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </Link>
              )}
            </FileListItemName>
          </Column>

          {status === 'error' && (
            <Column width="content">
              <Tooltip title="Retry">
                <IconButton size="small" onClick={onRetry}>
                  <Refresh fontSize="small" />
                </IconButton>
              </Tooltip>
            </Column>
          )}

          <Column width="content">
            {status === 'loading' ? (
              <IconButton size="small" disabled={true}>
                <FileListItemProgress size="1em" />
              </IconButton>
            ) : (
              <Tooltip title="Delete">
                <IconButton size="small" onClick={onDelete}>
                  {!isHovered && status === 'success' ? (
                    <CheckCircle fontSize="small" htmlColor={Color.Green300} />
                  ) : (
                    <Delete fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </Column>
        </Columns>
      </div>
    );
  },
);
