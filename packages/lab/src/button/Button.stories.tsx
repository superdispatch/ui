import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import { Meta } from '@storybook/react';
import { Inline, Stack } from '@superdispatch/ui';

import { Box } from '../box/Box';
import { Button } from './Button';

export default { title: 'Lab/Button', component: Button } as Meta;

export const basic = () => (
  <Inline verticalAlign="center" horizontalAlign="center">
    <Stack align="center">
      <Button variant="primary">Primary</Button>
      <Button variant="primary" active={true}>
        Hover
      </Button>
      <Button variant="primary" pending={true}>
        Pending
      </Button>
      <Button variant="primary" disabled={true}>
        Disabled
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="default">Default</Button>
      <Button variant="default" active={true}>
        Hover
      </Button>
      <Button variant="default" pending={true}>
        Pending
      </Button>
      <Button variant="default" disabled={true}>
        Disabled
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="neutral">Neutral</Button>
      <Button variant="neutral" active={true}>
        Hover
      </Button>
      <Button variant="neutral" pending={true}>
        Pending
      </Button>
      <Button variant="neutral" disabled={true}>
        Disabled
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="text">Text</Button>
      <Button variant="text" active={true}>
        Hover
      </Button>
      <Button variant="text" pending={true}>
        Pending
      </Button>
      <Button variant="text" disabled={true}>
        Disabled
      </Button>
    </Stack>

    <Stack align="center">
      <Button variant="critical">Critical</Button>
      <Button variant="critical" active={true}>
        Hover
      </Button>
      <Button variant="critical" pending={true}>
        Pending
      </Button>
      <Button variant="critical" disabled={true}>
        Disabled
      </Button>
    </Stack>

    <Box backgroundColor="Grey500" padding="xsmall" borderRadius="small">
      <Stack align="center">
        <Button variant="inverted">Inverted</Button>
        <Button variant="inverted" active={true}>
          Hover
        </Button>
        <Button variant="inverted" pending={true}>
          Pending
        </Button>
        <Button variant="inverted" disabled={true}>
          Disabled
        </Button>
      </Stack>
    </Box>
  </Inline>
);

export const sizes = () => (
  <Stack space="medium" align="center">
    <Stack space="small" align="center">
      <Inline>
        <Button variant="primary" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="primary" size="small">
          Submit
        </Button>

        <Button variant="primary" size="small" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="primary" size="small" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="primary" size="small" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="primary" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="primary" size="medium">
          Submit
        </Button>

        <Button variant="primary" size="medium" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="primary" size="medium" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="primary" size="medium" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="primary" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="primary" size="large">
          Submit
        </Button>

        <Button variant="primary" size="large" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="primary" size="large" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="primary" size="large" pending={true}>
          Pending
        </Button>
      </Inline>
    </Stack>

    <Stack space="small" align="center">
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

    <Stack space="small" align="center">
      <Inline>
        <Button variant="neutral" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="neutral" size="small">
          Submit
        </Button>

        <Button variant="neutral" size="small" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="neutral" size="small" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="neutral" size="small" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="neutral" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="neutral" size="medium">
          Submit
        </Button>

        <Button variant="neutral" size="medium" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="neutral" size="medium" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="neutral" size="medium" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="neutral" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="neutral" size="large">
          Submit
        </Button>

        <Button variant="neutral" size="large" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="neutral" size="large" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="neutral" size="large" pending={true}>
          Pending
        </Button>
      </Inline>
    </Stack>

    <Stack space="small" align="center">
      <Inline>
        <Button variant="text" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="text" size="small">
          Submit
        </Button>

        <Button variant="text" size="small" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="text" size="small" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="text" size="small" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="text" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="text" size="medium">
          Submit
        </Button>

        <Button variant="text" size="medium" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="text" size="medium" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="text" size="medium" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="text" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="text" size="large">
          Submit
        </Button>

        <Button variant="text" size="large" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="text" size="large" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="text" size="large" pending={true}>
          Pending
        </Button>
      </Inline>
    </Stack>

    <Stack space="small" align="center">
      <Inline>
        <Button variant="critical" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="critical" size="small">
          Submit
        </Button>

        <Button variant="critical" size="small" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="critical" size="small" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="critical" size="small" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="critical" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="critical" size="medium">
          Submit
        </Button>

        <Button
          variant="critical"
          size="medium"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button variant="critical" size="medium" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="critical" size="medium" pending={true}>
          Pending
        </Button>
      </Inline>

      <Inline>
        <Button variant="critical" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="critical" size="large">
          Submit
        </Button>

        <Button variant="critical" size="large" startIcon={<CloudUploadIcon />}>
          Import
        </Button>

        <Button variant="critical" size="large" endIcon={<SaveIcon />}>
          Save
        </Button>

        <Button variant="critical" size="large" pending={true}>
          Pending
        </Button>
      </Inline>
    </Stack>

    <Box backgroundColor="Grey500" padding="xsmall" borderRadius="small">
      <Stack space="small" align="center">
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
