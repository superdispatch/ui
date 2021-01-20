import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import { Meta } from '@storybook/react';
import { Inline, Stack } from '@superdispatch/ui';

import { Box } from '../box/Box';
import { Button } from './Button';

export default {
  title: 'Lab/Button',
  component: Button,
} as Meta;

export const basic = () => (
  <Inline verticalAlign="center">
    <Stack align="center">
      <Button variant="primary">Primary</Button>
      <Button variant="primary" active={true}>
        Primary
      </Button>
      <Button variant="primary" pending={true}>
        Primary
      </Button>
      <Button variant="primary" disabled={true}>
        Primary
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="default">Default</Button>
      <Button variant="default" active={true}>
        Default
      </Button>
      <Button variant="default" pending={true}>
        Default
      </Button>
      <Button variant="default" disabled={true}>
        Default
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="neutral">Neutral</Button>
      <Button variant="neutral" active={true}>
        Neutral
      </Button>
      <Button variant="neutral" pending={true}>
        Neutral
      </Button>
      <Button variant="neutral" disabled={true}>
        Neutral
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="critical">Critical</Button>
      <Button variant="critical" active={true}>
        Critical
      </Button>
      <Button variant="critical" pending={true}>
        Critical
      </Button>
      <Button variant="critical" disabled={true}>
        Critical
      </Button>
    </Stack>

    <Box backgroundColor="Grey500" padding="xsmall" borderRadius="small">
      <Stack align="center">
        <Button variant="inverted">Inverted</Button>
        <Button variant="inverted" active={true}>
          Inverted
        </Button>
        <Button variant="inverted" pending={true}>
          Inverted
        </Button>
        <Button variant="inverted" disabled={true}>
          Inverted
        </Button>
      </Stack>
    </Box>
  </Inline>
);

export const sizes = () => (
  <Stack space="medium">
    <Stack space="small">
      <Inline>
        <Button variant="default" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="default" size="small">
          Submit
        </Button>

        <Button variant="default" size="small" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="default" size="small" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="default" size="small" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="default" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="default" size="medium">
          Submit
        </Button>

        <Button variant="default" size="medium" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="default" size="medium" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="default" size="medium" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="default" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="default" size="large">
          Submit
        </Button>

        <Button variant="default" size="large" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="default" size="large" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="default" size="large" pending={true}>
          Pending
        </Button>
      </Inline>
    </Stack>

    <Box backgroundColor="Grey500" padding="xsmall" borderRadius="small">
      <Stack space="small">
        <Inline>
          <Button variant="inverted" size="small">
            <MoreHorizIcon />
          </Button>

          <Button variant="inverted" size="small">
            Submit
          </Button>

          <Button
            variant="inverted"
            size="small"
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>

          <Button variant="inverted" size="small" endIcon={<SaveIcon />}>
            Save
          </Button>

          <Button variant="inverted" size="small" pending={true}>
            Submit
          </Button>
        </Inline>

        <Inline>
          <Button variant="inverted" size="medium">
            <MoreHorizIcon />
          </Button>

          <Button variant="inverted" size="medium">
            Submit
          </Button>

          <Button
            variant="inverted"
            size="medium"
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>

          <Button variant="inverted" size="medium" endIcon={<SaveIcon />}>
            Save
          </Button>

          <Button variant="inverted" size="medium" pending={true}>
            Submit
          </Button>
        </Inline>

        <Inline>
          <Button variant="inverted" size="large">
            <MoreHorizIcon />
          </Button>

          <Button variant="inverted" size="large">
            Submit
          </Button>

          <Button
            variant="inverted"
            size="large"
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>

          <Button variant="inverted" size="large" endIcon={<SaveIcon />}>
            Save
          </Button>

          <Button variant="inverted" size="large" pending={true}>
            Submit
          </Button>
        </Inline>
      </Stack>
    </Box>
  </Stack>
);
