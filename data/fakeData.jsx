import { Space, Tag } from 'antd';
import { formatDate, getTagColor } from '../utils/helpers';
import { faker } from '@faker-js/faker';

export let data = [
  {
    key: '1',
    name: 'John Brown',
    phoneNumber: '0903331412',
    curAddress: 'New York No. 1 Lake Park',
    desAddress: 'London No. 1 Lake Park',
    tags: ['driver assigned'],
    pickUpTime: formatDate(new Date())
  },
  {
    key: '2',
    name: 'Jim Green',
    phoneNumber: '0903331412',
    curAddress: 'London No. 1 Lake Park',
    desAddress: 'New York No. 1 Lake Park',
    tags: ['driver assigned'],
    pickUpTime: formatDate(new Date())
  },
  {
    key: '3',
    name: 'Joe Black',
    phoneNumber: '0903331412',
    curAddress: 'Sydney No. 1 Lake Park',
    desAddress: 'New York No. 1 Lake Park',
    tags: ['driver arrived'],
    pickUpTime: formatDate(new Date())
  },
  {
    key: '4',
    name: 'Joe Black 4',
    phoneNumber: '0903331412',
    curAddress: 'Sydney No. 1 Lake Park',
    desAddress: 'New York No. 1 Lake Park',
    tags: ['driver picked up'],
    pickUpTime: formatDate(new Date())
  }
];
for (let i = 5; i < 20; i++) {
  data.push({
    key: `${i + 1}`,
    name: faker.internet.displayName(),
    phoneNumber: faker.phone.number(),
    curAddress: faker.location.streetAddress(),
    desAddress: faker.location.streetAddress(),
    tags: ['driver assigned'],
    pickUpTime: formatDate(new Date())
  });
}
export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber'
  },
  {
    title: 'Current Address',
    dataIndex: 'curAddress',
    key: 'curAddress'
  },
  {
    title: 'Destination Address',
    dataIndex: 'desAddress',
    key: 'desAddress'
  },
  {
    title: 'Time',
    dataIndex: 'pickUpTime',
    key: 'time'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          return (
            <Tag color={getTagColor(tag)} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>More details </a>
        <a>Delete</a>
      </Space>
    )
  }
];
