import { Space, Tag } from 'antd';
import { formatDate, getTagColor } from '../utils/helpers';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export let data = [
  {
    key: '1',
    name: 'John Brown',
    phoneNumber: '0903331412',
    curAddress: 'New York No. 1 Lake Park',
    desAddress: 'London No. 1 Lake Park',
    tags: ['driver assigned'],
    pickUpTime: formatDate(new Date()),
  },
  {
    key: '2',
    name: 'Jim Green',
    phoneNumber: '0903331412',
    curAddress: 'London No. 1 Lake Park',
    desAddress: 'New York No. 1 Lake Park',
    tags: ['driver assigned'],
    pickUpTime: formatDate(new Date()),
  },
  {
    key: '3',
    name: 'Joe Black',
    phoneNumber: '0903331412',
    curAddress: 'Sydney No. 1 Lake Park',
    desAddress: 'New York No. 1 Lake Park',
    tags: ['driver arrived'],
    pickUpTime: formatDate(new Date()),
  },
  {
    key: '4',
    name: 'Joe Black 4',
    phoneNumber: '0903331412',
    curAddress: 'Sydney No. 1 Lake Park',
    desAddress: 'New York No. 1 Lake Park',
    tags: ['driver picked up'],
    pickUpTime: formatDate(new Date()),
  },
];
for (let i = 4; i < 20; i++) {
  data.push({
    key: `${i + 1}`,
    name: faker.internet.displayName(),
    phoneNumber: faker.phone.number(),
    curAddress: faker.location.streetAddress(),
    desAddress: faker.location.streetAddress(),
    tags: ['driver assigned'],
    pickUpTime: formatDate(new Date()),
  });
}
export const columns = [
  {
    title: 'Customer ID',
    dataIndex: 'customerId',
    key: 'customerId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Current Address (lat | long)',
    dataIndex: 'pickupAddress',
    key: 'pickupAddress',
    render: (text) => (
      <>
        <span>{text}</span>
      </>
    ),
  },
  {
    title: 'Destination Address',
    dataIndex: 'destinationAddress',
    key: 'destinationAddress',
    render: (text) => (
      <>
        <span>{text}</span>
      </>
    ),
  },
  {
    title: 'Time',
    dataIndex: 'pickupTime',
    key: 'pickupTime',
    render: (text) => <span>{dayjs(text).format('DD-MM-YYYY HH:mm')}</span>,
  },
  {
    title: 'Tags',
    key: 'status',
    dataIndex: 'status',
    // render: (tags) => (
    //   <span>
    //     {tags.map((tag) => {
    //       return (
    //         <Tag color={getTagColor(tag)} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </span>
    // ),
    render: (tag) => <Tag color={getTagColor(tag)}>{tag}</Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => console.log(record)}>More details </a>
        <a>Delete</a>
      </Space>
    ),
  },
];
