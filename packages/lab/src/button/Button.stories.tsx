import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SaveIcon from '@material-ui/icons/Save';
import { Meta } from '@storybook/react';
import { Inline, Stack } from '@superdispatch/ui';

import { Box } from '../box/Box';
import { Button } from './Button';

export default {
  title: 'Lab/Button',
} as Meta;

export const contained = () => (
  <Stack space="medium">
    <Stack space="small">
      <Inline>
        <Button variant="contained" color="default" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="default" size="small">
          Submit
        </Button>

        <Button
          variant="contained"
          color="default"
          size="small"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="default"
          size="small"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="small"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="small"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="small"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>

      <Inline>
        <Button variant="contained" color="default" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="default" size="medium">
          Submit
        </Button>

        <Button
          variant="contained"
          color="default"
          size="medium"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="default"
          size="medium"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="medium"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="medium"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="medium"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>

      <Inline>
        <Button variant="contained" color="default" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="default" size="large">
          Submit
        </Button>

        <Button
          variant="contained"
          color="default"
          size="large"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="default"
          size="large"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="large"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="large"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="default"
          size="large"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>
    </Stack>

    <Stack space="small">
      <Inline>
        <Button variant="contained" color="critical" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="critical" size="small">
          Submit
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="small"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="small"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="small"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="small"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="small"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>

      <Inline>
        <Button variant="contained" color="critical" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="critical" size="medium">
          Submit
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="medium"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="medium"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="medium"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="medium"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="medium"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>

      <Inline>
        <Button variant="contained" color="critical" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="critical" size="large">
          Submit
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="large"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="large"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="large"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="large"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="critical"
          size="large"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>
    </Stack>

    <Stack space="small">
      <Inline>
        <Button variant="contained" color="positive" size="small">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="positive" size="small">
          Submit
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="small"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="small"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="small"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="small"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="small"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>

      <Inline>
        <Button variant="contained" color="positive" size="medium">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="positive" size="medium">
          Submit
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="medium"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="medium"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="medium"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="medium"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="medium"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>

      <Inline>
        <Button variant="contained" color="positive" size="large">
          <MoreHorizIcon />
        </Button>

        <Button variant="contained" color="positive" size="large">
          Submit
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="large"
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="large"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="large"
          endIcon={<SaveIcon />}
          active={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="large"
          endIcon={<SaveIcon />}
          disabled={true}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="positive"
          size="large"
          endIcon={<SaveIcon />}
          loading={true}
        >
          Save
        </Button>
      </Inline>
    </Stack>

    <Box backgroundColor="Grey500" padding="xsmall" borderRadius="small">
      <Stack space="small">
        <Inline>
          <Button variant="contained" color="inverted" size="small">
            <MoreHorizIcon />
          </Button>

          <Button variant="contained" color="inverted" size="small">
            Submit
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="small"
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="small"
            endIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="small"
            endIcon={<SaveIcon />}
            active={true}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="small"
            endIcon={<SaveIcon />}
            disabled={true}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="small"
            endIcon={<SaveIcon />}
            loading={true}
          >
            Save
          </Button>
        </Inline>

        <Inline>
          <Button variant="contained" color="inverted" size="medium">
            <MoreHorizIcon />
          </Button>

          <Button variant="contained" color="inverted" size="medium">
            Submit
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="medium"
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="medium"
            endIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="medium"
            endIcon={<SaveIcon />}
            active={true}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="medium"
            endIcon={<SaveIcon />}
            disabled={true}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="medium"
            endIcon={<SaveIcon />}
            loading={true}
          >
            Save
          </Button>
        </Inline>

        <Inline>
          <Button variant="contained" color="inverted" size="large">
            <MoreHorizIcon />
          </Button>

          <Button variant="contained" color="inverted" size="large">
            Submit
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="large"
            startIcon={<CloudUploadIcon />}
          >
            Import
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="large"
            endIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="large"
            endIcon={<SaveIcon />}
            active={true}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="large"
            endIcon={<SaveIcon />}
            disabled={true}
          >
            Save
          </Button>

          <Button
            variant="contained"
            color="inverted"
            size="large"
            endIcon={<SaveIcon />}
            loading={true}
          >
            Save
          </Button>
        </Inline>
      </Stack>
    </Box>
  </Stack>
);
