import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  categorySelector,
  fetchCategories,
} from "../../redux/features/category/slice";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

const Dashboard: React.FC = () => {
  const selectCategory = useAppSelector(categorySelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <Card>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Categories"
                value={selectCategory.categories.length}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Dashboard;
