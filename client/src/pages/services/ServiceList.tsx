import React, { useEffect, useState } from "react";
import CustomTable from "../../components/common/tables/CustomTable";
import { ServiceColumnsColumns } from "./columns";
import {
  Service,
  deleteService,
  fetchServices,
  isEditForm,
  serviceSelector,
  toggleShowForm,
} from "../../redux/features/services/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  PlusSquareOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Card, Modal } from "antd";
import ServiceForm from "./AddServiceForm";
import useAuth from "../../hooks/auth";

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Array<Service>>([]);

  const auth = useAuth();

  const selectService = useAppSelector(serviceSelector);
  const dispatch = useAppDispatch();
  const { confirm } = Modal;

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  useEffect(() => {
    if (auth?.role === "seller") {
      setServices([
        ...selectService.services.filter(
          (service) => service.userId == auth?.id
        ),
      ]);
    } else {
      setServices([...selectService.services]);
    }
  }, [selectService.services]);

  const handleDelete = (id: number) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        dispatch(deleteService(id));
      },
    });
  };

  const handleEdit = (id: number) => {
    console.log("ID", id);
    dispatch(toggleShowForm());
    dispatch(isEditForm(id));
  };

  return (
    <>
      <h1>
        <UnorderedListOutlined /> Services
      </h1>
      {auth?.role === "seller" ? (
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          style={{ float: "right", marginBottom: "1rem" }}
          onClick={() => dispatch(toggleShowForm())}
        >
          Add Service
        </Button>
      ) : null}

      <div>
        <ServiceForm />
      </div>
      <CustomTable
        columns={ServiceColumnsColumns(handleDelete, handleEdit)}
        dataSource={services}
      />
    </>
  );
};

export default ServiceList;
