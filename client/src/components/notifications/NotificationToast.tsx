import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearNotify,
  notificationSelector,
} from "../../redux/features/notifications/slice";

const NotificationToast: React.FC = () => {
  const selectNotification = useAppSelector(notificationSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectNotification.notifications.length) {
      selectNotification.notifications.forEach((notification) => {
        toast(notification.message, {
          autoClose: notification.duration,
          type: notification.type,
          toastId: notification.id,
        });

        setTimeout(() => {
          dispatch(clearNotify(notification.id));
        }, notification.duration);
      });
    }
  }, [selectNotification.notifications, dispatch]);

  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default NotificationToast;
