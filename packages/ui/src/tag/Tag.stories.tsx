import { Inline } from '../inline/Inline';
import { Tag } from './Tag';

export default { title: 'Data Display/Tag', component: Tag };

export const subtle = () => (
  <Inline>
    <Tag color="grey" variant="subtle">
      Grey
    </Tag>
    <Tag color="blue" variant="subtle">
      Blue
    </Tag>
    <Tag color="green" variant="subtle">
      Green
    </Tag>
    <Tag color="purple" variant="subtle">
      Purple
    </Tag>
    <Tag color="red" variant="subtle">
      Red
    </Tag>
    <Tag color="teal" variant="subtle">
      Teal
    </Tag>
  </Inline>
);

export const bold = () => (
  <Inline>
    <Tag color="grey" variant="bold">
      Grey
    </Tag>
    <Tag color="blue" variant="bold">
      Blue
    </Tag>
    <Tag color="green" variant="bold">
      Green
    </Tag>
    <Tag color="purple" variant="bold">
      Purple
    </Tag>
    <Tag color="red" variant="bold">
      Red
    </Tag>
    <Tag color="teal" variant="bold">
      Teal
    </Tag>
    <Tag color="yellow" variant="bold">
      Yellow
    </Tag>
  </Inline>
);
