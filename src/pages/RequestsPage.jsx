import { useState } from 'react';
import InputUserInforForm from '../components/CallCenter/InputUserInforForm';

const RequestsPage = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const handleAddNew = () => {
    setIsAddNew(!isAddNew);
  };
  return (
    <div className="p-4">
      <button
        className="outline-none border py-2 px-4 text-2xl rounded-md hover:opacity-70 active:scale-[.95]"
        onClick={handleAddNew}>
        + Add new
      </button>
      {isAddNew && <InputUserInforForm />}
    </div>
  );
};

export default RequestsPage;
