import { useState, useEffect} from 'react';
import InputUserInforForm from '../components/CallCenter/InputUserInforForm';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import RandomImage from '../components/randomImage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of Rides Monthly',
    },
  },
};

export const StackOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Monthly Comparison',
    },
    legend: {
      display: false, // Set this to false to hide the labels
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  
  datasets: [
    {
      label: 'Car',
      data: [13,10,30,12,50,10,20],
      borderColor: 'rgba(75, 250, 72, 0.5)', 
        backgroundColor: 'rgba(75, 250, 72,0.8)',
    },
    {
      label: 'Bike',
      data: [10,15,12,18,20,25,30],
      borderColor: 'rgba(75, 200, 72, 0.5)', 
        backgroundColor: 'rgba(75, 200, 72,0.8)',
    }
  ],
};

const pieOptions = {
  plugins: {
    legend: {
      display: false, // Set this to false to hide the labels
    },
    title: {
      display: true,
      text: 'Number of Vehicles',
    },
  },
};

export const pieData = {
  labels: ['Car', 'Bike'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(75, 250, 72, 0.8)',
        'rgba(75, 200, 72, 0.8)',
        'rgba(75, 150, 72, 0.8)',
      ],
      borderColor: [
        'rgba(75, 220, 72, 0.5)',
        'rgba(75, 130, 72, 0.5)',
        'rgba(75, 100, 72, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

function StarRating({ numberOfStars }) {
  const stars = [];

  // Create an array of stars based on the numberOfStars prop
  for (let i = 1; i <= numberOfStars; i++) {
    stars.push(
      <span key={i} className="text-yellow-500 text-3xl">
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
}

const StatPage = () => {
  const [reqList, setReqList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const getAllRequests = async () => {
    const res = await axios.get(`/api/v1/callcenter/bookings/filter`, {
      withCredentials: true,
    });
    console.log('request list from server', res);
    setReqList(res.data?.bookings);
    const res_ = await axios.get(`/api/v1/callcenter/users/filter?current_page=1&page_size=1000`);
    console.log('users from server', res_);
    setUserList(res_.data?.users);
  };
  const getAllRating = async ()=>{
    const res = await axios.get(`/api/v1/callcenter/rating/list`, {
      withCredentials: true,
    });
    console.log('rating from server', res);
    setRatingList(res?.data)
  };
  useEffect(() => {
    getAllRequests();
    getAllRating();
  }, []);
  return (
    <div className="w-4/5 mx-auto p-4 flex">
      <div className="w-2/3 mx-2 shadow-md">
        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <div className='w-1/3 h-16 bg-white flex rounded-xl shadow-md'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/8922/8922324.png" alt="revenue" />
                <div className='my-auto ml-4'>
                    <div className='font-bold text-sm'>Total Revenue</div>
                    <div className='text-green-600'>$125640</div>
                </div>
            </div>
            <div className='w-1/3 h-16 bg-white flex rounded-xl shadow-md mx-3'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/4088/4088042.png" alt="booking" />
                <div className='my-auto ml-4'>
                    <div className='font-bold text-sm'>Total Rides</div>
                    <div className='text-green-600'>{reqList.length}</div>
                </div>
            </div>
            <div className='w-1/3 h-16 bg-white flex rounded-xl shadow-md'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/2898/2898588.png" alt="driver" />
                <div className='my-auto ml-4'>
                    <div className='font-bold text-sm'>Total Drivers</div>
                    <div className='text-green-600'>{userList.length}</div>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <Line className='bg-white shadow-md p-4' options={options} data={data} />
        </div>

        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <div className='w-1/3'>
              <Pie className='p-4 ' options={pieOptions} data={pieData} />
            </div>
            <div className='w-2/3'>
             <Bar className='p-4' options={StackOptions} data={data} />
            </div>
        </div>
      </div>
      <div className='w-1/3 mx-2 shadow-md'>
        <div className='w-full bg-slate-100 p-3'>
            <div className='justify-between flex'>
                <div className='font-bold text-lg'>
                  Reviews and Ratings
                </div>
                <div className='text-sm text-green-500'>
                  See All
                </div>
            </div>
        </div>
        <div>
        {ratingList.map((rating) => (
          <div className='flex p-2 border-2 mt-2' key={rating.id}>
            <div className='w-1/5 mt-2 ml-3'><RandomImage /></div>
            <div className='w-4/5'>
              <div><StarRating numberOfStars={rating.rate} /></div>
              <div className='font-semibold'>{rating.message}</div>
            </div>
          </div>
        ))}
          
        </div>
      </div>
    </div>
  );
};

export default StatPage;
