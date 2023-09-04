import { Radio, Space, Table, Tag, Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import InputUserInforForm from '../../components/CallCenter/InputUserInforForm';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/CustomModal';
import { getTagColor, formatDate } from '../../../utils/helpers';
import { columns, data } from '../../../data/fakeData';
import axios from 'axios';
const AllRequests = () => {
  const [dataList, setDataList] = useState([]);
  const [isAddNew, setIsAddNew] = useState(false);

  const getAllRequests = async () => {
    const res = await axios.get(`/api/v1/callcenter/bookings/details/booking_id=${"'1'"}`);
    console.log('res', res);
  };

  useEffect(() => {
    console.log(data);
    setDataList(data);
    getAllRequests();
  }, []);

  return (
    <div className=" mx-auto">
      <Table
        className=" overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg "
        columns={columns}
        pagination={{
          position: ['topLeft'],
          pageSize: 15,
        }}
        dataSource={dataList}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => {
              e.stopPropagation();
              console.log(record, rowIndex);
            },
          };
        }}
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
