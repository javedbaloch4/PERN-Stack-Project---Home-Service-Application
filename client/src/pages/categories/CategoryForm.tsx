import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Category,
  categorySelector,
  createCategory,
  toggleShowForm,
  updateCategory,
} from "../../redux/features/category/slice";

type FieldType = {
  name?: string;
};

const CategoryForm: React.FC = () => {
  const selectCategory = useAppSelector(categorySelector);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setShowForm(selectCategory.showForm);
    setCategory(selectCategory.category);
  }, [selectCategory.showForm, selectCategory.category]);

  const onFinish = (values: any) => {
    selectCategory.isEditForm
      ? dispatch(updateCategory({ ...values, id: category!.id }))
      : dispatch(createCategory(values));
  };

  return (
    <Card
      title={selectCategory.isEditForm ? "Edit Category" : "Add Category"}
      bordered={true}
      style={{
        width: 800,
        margin: "50px auto",
        display: showForm ? "block" : "none",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input
            // value={"df"}
            key={category && category.id}
            defaultValue={category && category.name ? category.name : ""}
          />
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

export default CategoryForm;
