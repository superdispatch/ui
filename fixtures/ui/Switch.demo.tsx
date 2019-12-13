import {
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';

export default function SwitchDemo() {
  return (
    <Box padding={2} maxWidth={280}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Checked</TableCell>
            <TableCell>Unchecked</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell variant="head">Readonly</TableCell>

            <TableCell>
              <Switch checked={true} />
            </TableCell>

            <TableCell>
              <Switch checked={false} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell variant="head">Disabled</TableCell>

            <TableCell>
              <Switch disabled={true} checked={true} />
            </TableCell>

            <TableCell>
              <Switch disabled={true} checked={false} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell variant="head">Uncontrolled</TableCell>

            <TableCell>
              <Switch defaultChecked={true} />
            </TableCell>

            <TableCell>
              <Switch />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}
