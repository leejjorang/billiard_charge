import { IForm } from "./type";

const calculate = (values: IForm) => {
  const {
    numPeople,
    tableType,
    paymentMethod,
    isDiscount,
    beerCount,
    sojuCount,
    baseFee,
  } = values;

  // 기본 요금 계산
  const minimumFees: { [key: number]: number } = {
    2: 6000,
    3: 7000,
    4: 9000,
  };

  const additionalFeePerPerson = 3000; // 5명 이상일 경우 추가 요금

  // 최소 요금 적용
  const minimumFee =
    numPeople === 1
      ? 0
      : numPeople <= 4
      ? minimumFees[numPeople]
      : minimumFees[4] + (numPeople - 4) * additionalFeePerPerson;

  const adjustedBaseFee = numPeople === 1 ? Math.min(baseFee, 10000) : baseFee;
  const finalBaseFee = Math.max(adjustedBaseFee, minimumFee);

  // 평일 낮 할인 적용 (대대인 경우에만)
  const discount = isDiscount && tableType === "large" ? finalBaseFee * 0.2 : 0;

  // 총 요금 계산 (음료 추가)
  const beerCost = beerCount * 3500;
  const sojuCost = sojuCount * 4000;
  const total = finalBaseFee + beerCost + sojuCost;
  const final = finalBaseFee + beerCost + sojuCost - discount;

  // 포인트 적립 (현금 결제 && 낮 할인 없음)
  const points =
    paymentMethod === "cash" && !isDiscount
      ? (finalBaseFee - discount) * 0.05
      : 0;

  return {
    total: Math.round(total),
    discount: Math.round(discount),
    finalAmount: Math.round(final),
    points: Math.round(points),
  };
};

export default calculate;
