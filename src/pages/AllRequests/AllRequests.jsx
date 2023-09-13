import { Radio, Space, Table, Tag, Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import InputUserInforForm from '../../components/CallCenter/InputUserInforForm';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../components/CustomModal';
import { getTagColor, formatDate, generateMongoDBId } from '../../../utils/helpers';
import { columns, data } from '../../../data/fakeData';
import axios from 'axios';
const AllRequests = ({ events }) => {
  const [dataList, setDataList] = useState([]);
  const [isAddNew, setIsAddNew] = useState(false);
  const [list, setList] = useState([]);
  const [currentID, setCurrentID] = useState('');
  const getAllRequests = async () => {
    const res = await axios.get(`/api/v1/callcenter/bookings/filter`, {
      withCredentials: true,
    });
    console.log('list from server', res?.bookings);
    setList(res.data?.bookings);
    return res.data;
  };
  const updateBooking = async (booking_id, driver_id, message) => {
    const res = await axios.post(
      `/api/v1/callcenter/bookings/update?booking_id=${currentID}`,
      {
        status: 'RECEIVED',
      },
      {
        withCredentials: true,
      },
    );
    console.log('updateBooking', res);
    return res.data;
  };
  const handleCRUD = (events) => {
    const { documentKey, operationType, fullDocument } = events[events.length - 1];
    const rawId = documentKey._id.id;
    let fullId = [];
    for (let i = 0; i < rawId.length; i++) {
      fullId.push(rawId[i]);
    }
    setCurrentID(generateMongoDBId(fullId));
    switch (operationType) {
      case 'insert':
      //Find the event in the db and insert it to the list
    }
  };
  useEffect(() => {
    console.log(data);
    setDataList(data);
    getAllRequests();
  }, []);

  useEffect(() => {
    console.log(events);
    if (events[events.length - 1] != null || events[events.length - 1] != undefined) {
      const rawId = events?.[events.length - 1]?.documentKey._id.id;
      console.log('🚀 events[events.length - 1]', events[events.length - 1]);
      console.log('🚀 events[events.length - 1].fullDocument', events[events.length - 1]?.fullDocument);
      console.log('🚀 ~ useEffect ~ rawId:', generateMongoDBId(rawId));
      console.log('full list', list);
      switch (events[events.length - 1]?.operationType) {
        case 'insert':
          setList((old) => [...old, events[events.length - 1]?.fullDocument]);
          break;
        case 'update': {
          const updatedFields = events[events.length - 1]?.updateDescription?.updatedFields;
          console.log('🚀 ~ useEffect ~ updatedFields:', updatedFields);
          const updatedList = list.map((item) => {
            if (item.bookingId == generateMongoDBId(rawId)) {
              return { ...item, ...updatedFields };
            }
            return item;
          });
          setList(updatedList);
          console.log('update', updatedList);
          break;
        }
      }
    }
  }, [events]);

  useEffect(() => {
    console.log('list when changed', list);
  }, [list]);

  return (
    <div className=" mx-auto">
      <Table
        className=" overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg "
        columns={columns}
        pagination={{
          position: ['topLeft'],
          pageSize: 15,
        }}
        dataSource={list}
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
