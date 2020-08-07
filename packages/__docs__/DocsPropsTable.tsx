import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@material-ui/core';
import {
  PropsTableProps,
  PropsTableRowsProps,
} from '@storybook/components/dist/blocks';
import React, { useEffect, useMemo, useState } from 'react';

function DocsTable(props: PropsTableProps) {
  const { rows } = props as Partial<PropsTableRowsProps>;

  if (!rows?.length) {
    return null;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell variant="head">Name</TableCell>
          <TableCell variant="head">Type</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map(({ name, type: { summary } }) => (
          <TableRow key={name}>
            <TableCell>
              <code>{name}</code>
            </TableCell>
            <TableCell>
              <Typography color="primary">
                <code>{summary}</code>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface DocsPropsTableProps {
  components: Map<string, PropsTableProps>;
}

export function DocsPropsTable({ components }: DocsPropsTableProps) {
  const tabs = useMemo(() => Array.from(components.keys()), [components]);
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const tableProps = components.get(currentTab);

  useEffect(() => {
    setCurrentTab(tabs[0]);
  }, [tabs]);

  return (
    <>
      {tabs.length > 1 && (
        <Tabs
          value={currentTab}
          onChange={(_, nextTab) => {
            setCurrentTab(nextTab);
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab} value={tab} label={tab} />
          ))}
        </Tabs>
      )}

      {tableProps && <DocsTable {...tableProps} />}
    </>
  );
}
