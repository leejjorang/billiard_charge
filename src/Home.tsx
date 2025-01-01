import React, { useState } from "react";
import { Form, InputNumber, Select, Checkbox, Button, Card } from "antd";
import calculate from "./calculate";
import { IForm } from "./type";

const { Option } = Select;

const Home = () => {
  const [form] = Form.useForm();
  const [results, setResults] = useState({
    total: 0,
    discount: 0,
    finalAmount: 0,
    points: 0,
  });

  const handleFinish = async (values: IForm) => {
    const calculatedResults = await calculate(values);
    setResults(calculatedResults);
  };

  return (
    <Card title="당구 요금 계산기" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          tableType: "large",
          paymentMethod: "card",
          isDiscount: true,
          beerCount: 0,
          sojuCount: 0,
        }}
      >
        <Form.Item
          label="인원수"
          name="numPeople"
          rules={[{ required: true, message: "인원수를 입력해 주세요" }]}
        >
          <InputNumber min={1} max={20} style={{ width: "40%" }} />
        </Form.Item>

        <Form.Item
          label="중대/대대"
          name="tableType"
          rules={[{ required: true, message: "테이블 타입을 입력해 주세요" }]}
        >
          <Select>
            <Option value="medium">중대</Option>
            <Option value="large">대대</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="시간 요금 (1인인 경우 연습구 요금으로 계산해 입력하세요)"
          name="baseFee"
          rules={[{ required: true, message: "요금을 입력해 주세요" }]}
        >
          <InputNumber style={{ width: "40%" }} />
        </Form.Item>

        <Form.Item
          label="결제방식"
          name="paymentMethod"
          rules={[
            { required: true, message: "Please select a payment method" },
          ]}
        >
          <Select>
            <Option value="cash">현금</Option>
            <Option value="card">카드</Option>
          </Select>
        </Form.Item>

        <Form.Item name="isDiscount" valuePropName="checked">
          <Checkbox>평일 5시 이전 시작</Checkbox>
        </Form.Item>

        <Form.Item label="맥주" name="beerCount">
          <InputNumber min={0} max={20} style={{ width: "40%" }} />
        </Form.Item>

        <Form.Item label="소주" name="sojuCount">
          <InputNumber min={0} max={20} style={{ width: "40%" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            계산하기
          </Button>
        </Form.Item>
      </Form>

      <Card style={{ marginTop: 20 }}>
        <p>총합: {results.total} 원</p>
        <p>할인: {results.discount} 원</p>
        <p style={{ fontWeight: "bold" }}>최종요금: {results.finalAmount} 원</p>
        <p style={{ fontWeight: "bold" }}>포인트 적립: {results.points} 원</p>
      </Card>
    </Card>
  );
};

export default Home;
