import React, { useEffect, useState } from "react";
import CustomTable from "../../components/common/tables/CustomTable";
import { categoryColumns } from "./columns";
import { Button, Spin, Modal, Input } from "antd";
import {
  PlusSquareOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Category,
  categorySelector,
  deleteCategory,
  fetchCategories,
  toggleShowForm,
  isEditForm,
} from "../../redux/features/category/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CategoryForm from "./CategoryForm";
import useAuth from "../../hooks/auth";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const auth = useAuth();

  const { confirm } = Modal;
  const dispatch = useAppDispatch();

  const selectCategory = useAppSelector(categorySelector);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    setLoading(selectCategory.loading);
    setError(selectCategory.error);
    const data = [...selectCategory.categories];
    setCategories(
      data.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    );
    setDataSource(categories);
  }, [selectCategory]);

  const handleDelete = (id: number) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        dispatch(deleteCategory(id));
      },
    });
  };

  const handleEdit = (id: number) => {
    dispatch(toggleShowForm());
    dispatch(isEditForm(id));
  };

  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(categories);

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return loading ? (
    <Spin />
  ) : (
    <>
      <h1>
        <UnorderedListOutlined /> Categories
      </h1>
      {auth?.role === "admin" ? (
        <Button
          type="primary"
          icon={<PlusSquareOutlined />}
          style={{ float: "right", marginBottom: "1rem" }}
          onClick={() => dispatch(toggleShowForm())}
        >
          Add Category
        </Button>
      ) : null}
      <div>
        <CategoryForm />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Input
          placeholder="Search Name"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = categories.filter((entry) =>
              entry.name.includes(currValue)
            );
            setDataSource(filteredData);
          }}
        />
      </div>

      <CustomTable
        columns={categoryColumns(handleDelete, handleEdit, auth!)?.filter(
          (e) => Object.keys(e).length
        )}
        dataSource={dataSource}
        onChange={onChange}
      />
    </>
  );
};

export default CategoryList;
