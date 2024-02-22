import { Row, Select, Slider, Spin } from "antd";
import "./index.scss";
import ServiceCard from "./ServiceCard";
import { useAppSelector } from "../../redux/hooks";
import { Service, serviceSelector } from "../../redux/features/services/slice";
import {
  Category,
  categorySelector,
} from "../../redux/features/category/slice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookService = () => {
  const selectService = useAppSelector(serviceSelector);
  const selectCategory = useAppSelector(categorySelector);

  const [categories, setCategories] = useState<Array<Category>>();
  const [filter, setFilter] = useState({
    category: "",
    price: {
      min: 0,
      max: 0,
    },
    location: "",
  });

  const [services, setServices] = useState<Array<Service>>();

  useEffect(() => {
    setCategories(selectCategory.categories);
    setServices(selectService.services);
  }, [selectCategory.categories, selectService.services]);

  const changeCategory = (value: string) => {
    setFilter({ ...filter, category: value });
  };

  useEffect(() => {
    if (filter.category) {
      console.log("Service ", services);
      setServices([
        ...selectService.services!?.filter(
          (service) => service.category.name === filter.category
        ),
      ]);
    }

    if (filter.price.max > 0 || filter.price.min >= 0) {
      setServices([
        ...selectService.services.filter(
          (service: Service) =>
            service.price >= filter.price.min &&
            service.price <= filter.price.max
        ),
      ]);
    }
  }, [filter]);

  const handleSlider = (value: number[]) => {
    setFilter({ ...filter, price: { min: value[0], max: value[1] } });
  };

  return selectService.loading ? (
    <Spin />
  ) : (
    <div className="book-service-wrapper">
      Search by category:{" "}
      <Select
        placeholder="Select Category"
        style={{ width: 200, marginBottom: 20 }}
        onChangeComplete={changeCategory}
        options={categories?.map((category) => {
          return {
            id: category.id,
            value: category.name,
            label: category.name,
          };
        })}
      />
      Search by price
      <Slider
        range
        defaultValue={[20, 800]}
        max={2000}
        onChange={handleSlider}
      />
      <Row gutter={16}>
        {services &&
          services.length &&
          services
            .filter((service) => service.statusService === "approved")
            .map((service) => (
                <ServiceCard service={service} />
            ))}
      </Row>
    </div>
  );
};

export default BookService;
