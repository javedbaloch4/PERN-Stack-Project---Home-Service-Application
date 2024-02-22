import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createService,
  toggleShowForm,
  updateService,
} from "../../redux/features/services/slice";
import { Service, serviceSelector } from "../../redux/features/services/slice";
import {
  categorySelector,
  fetchCategories,
} from "../../redux/features/category/slice";
import { userSelector } from "../../redux/features/auth/slice";
import useAuth from "../../hooks/auth";

type FieldType = {
  title?: string;
  description?: string;
  location?: string;
  price?: number;
  status?: string;
  categoryId?: number;
};

const { Option } = Select;

const ServiceForm: React.FC = () => {
  const selectService = useAppSelector(serviceSelector);
  const selectCategory = useAppSelector(categorySelector);
  const selectUser = useAppSelector(userSelector);
  const [showForm, setShowForm] = useState(true);
  const [service, setServices] = useState<Service | null>(null);

  const auth = useAuth();

  const [form] = Form.useForm();

  useEffect(() => {
    setShowForm(selectService.showForm);
    setServices(selectService.service);

    // Set form fields when service data changes
    if (selectService.service && selectService.isEditForm) {
      form.setFieldsValue({
        title: selectService.service.title || "",
        description: selectService.service.description || "",
        location: selectService.service.location || "",
        price: selectService.service.price || undefined,
        status: selectService.service.status ? "active" : "inactive",
        statusService:
          selectService.service.statusService === "approved"
            ? "approved"
            : selectService.service.statusService === "rejected"
            ? "rejected"
            : "pending",
        categoryId: selectService.service.categoryId || undefined,
      });
    } else {
      form.setFieldsValue({
        title: "",
        description: "",
        location: "",
        price: undefined,
        status: "",
        statusService: "",
        categoryId: undefined,
      });
    }
  }, [selectService.showForm, selectService.service]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onFinish = (values: any) => {
    // @ts-ignore
    values.userId = selectUser.user?.id;
    values.status = values.status === "active" ? true : false;
    values.statusService =
      values.statusService === "approved"
        ? "approved"
        : values.statusService === "rejected"
        ? "rejected"
        : "pending";
    selectService.isEditForm
      ? dispatch(updateService({ ...values, id: service!.id }))
      : dispatch(createService(values));
  };

  return (
    <Card
      title={selectService.isEditForm ? "Edit Service" : "Add Service"}
      bordered={true}
      style={{
        width: 800,
        margin: "50px auto",
        display: showForm ? "block" : "none",
      }}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[
            {
              required: !selectService.isEditForm,
              message: "Please input title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[
            {
              required: !selectService.isEditForm,
              message: "Please input description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Location"
          rules={[
            {
              required: !selectService.isEditForm,
              message: "Please input location!",
            },
          ]}
          name="location"
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Price"
          rules={[
            {
              required: !selectService.isEditForm,
              message: "Please input price!",
            },
          ]}
          name="price"
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: !selectService.isEditForm,
              message: "Please select status!",
            },
          ]}
        >
          <Select placeholder="Select status">
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Select>
        </Form.Item>

        {auth?.role === "admin" ? (
          <>
            <Form.Item
              label="Status Service"
              name="statusService"
              rules={[
                {
                  required: !selectService.isEditForm,
                  message: "Please select status service!",
                },
              ]}
            >
              <Select placeholder="Select status">
                <Option value="pending">Pending</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
              </Select>
            </Form.Item>
          </>
        ) : null}

        <Form.Item
          label="CategoryId"
          rules={[
            {
              required: !selectService.isEditForm,
              message: "Please select category!",
            },
          ]}
          name="categoryId"
        >
          <Select placeholder="Select category">
            {selectCategory.categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          &nbsp;
          <Button
            type="primary"
            danger
            onClick={() => dispatch(toggleShowForm())}
          >
            Close
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ServiceForm;
