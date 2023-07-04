import { Button, Modal } from 'antd';
import { useState } from 'react';

const CustomModal = ({ title, content, buttons, children }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="" onClick={showModal}>
        {children}
        {title}
      </Button>
      <Modal open={open} title={title} footer={null} onCancel={handleCancel}>
        {content}
      </Modal>
    </>
  );
};

export default CustomModal;
