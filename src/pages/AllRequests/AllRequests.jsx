import { Radio, Space, Table, Tag, Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import InputUserInforForm from '../../components/CallCenter/InputUserInforForm';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/CustomModal';

const columns = [
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

// Helper functions
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
function getTagColor(tag) {
  const color = {
    driverAssigned: '#ffbe0b',
    driverArrived: '#fb5607',
    driverPickedUp: '#ff006e',
    driverArrivedAtDestination: '#8338ec',
    driverCompleteTheDrive: '#06d6a0',
    driverDeclinedToPick: '#ef233c',
    userCancelBooking: '#d90429',
    defaultColor: 'black'
  };

  switch (tag) {
    case 'driver assigned':
      return color.driverAssigned || color.defaultColor;
    case 'driver arrived':
      return color.driverArrived || color.defaultColor;
    case 'driver picked up':
      return color.driverPickedUp || color.defaultColor;
    case 'arrived at destination':
      return color.driverArrivedAtDestination || color.defaultColor;
    case 'driver completed the drive':
      return color.driverCompleteTheDrive || color.defaultColor;
    case 'driver declined to pick':
      return color.driverDeclinedToPick || color.defaultColor;
    default:
      return color.defaultColor;
  }
}
// End of helper functions
let data = [
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
const AllRequests = () => {
  const [isAddNew, setIsAddNew] = useState(false);

  // Generate fake data when component mounted
  useEffect(() => {
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
    setDataList(data);
  }, []);
  // End of generate fake data

  // create new variable to store data => set to dataSource below
  const [dataList, setDataList] = useState(data);

  return (
    <div className="relative">
      <Table
        columns={columns}
        pagination={{
          position: ['topLeft'],
          pageSize: 15
        }}
        dataSource={dataList}
      />
      <div className="fixed right-0 top-24 px-4 py-2 bg-[rgba(20,241,57,0.4)] rounded-2xl cursor-pointer hover:scale-105 transition-all z-10">
        <CustomModal title={'Add New Request'} content={<InputUserInforForm />} buttons={'Ok'}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
        </CustomModal>
      </div>
    </div>
  );
};
export default AllRequests;
