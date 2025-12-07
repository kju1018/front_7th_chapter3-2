// TODO: 쿠폰 관리 Hook
// 힌트:
// 1. 쿠폰 목록 상태 관리 (localStorage 연동 고려)
// 2. 쿠폰 추가/삭제
//
// 반환할 값:
// - coupons: 쿠폰 배열
// - addCoupon: 새 쿠폰 추가
// - removeCoupon: 쿠폰 삭제

import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { Coupon } from "../../types";
import {
  couponsAtom,
  addNotificationAtom,
  selectedCouponAtom,
} from "../atoms";
import {
  addCouponToList,
  findCouponByCode,
  removeCouponFromList,
} from "../models/coupon";

export function useCoupons() {
  const [coupons, setCoupons] = useAtom(couponsAtom);
  const addNotification = useSetAtom(addNotificationAtom);
  const setSelectedCoupon = useSetAtom(selectedCouponAtom);

  const addCoupon = useCallback(
    (newCoupon: Coupon) => {
      const existingCoupon = findCouponByCode(coupons, newCoupon.code);
      if (existingCoupon) {
        addNotification({
          message: "이미 존재하는 쿠폰 코드입니다.",
          type: "error",
        });
        return;
      }
      setCoupons((prev) => addCouponToList(prev, newCoupon));
      addNotification({ message: "쿠폰이 추가되었습니다.", type: "success" });
    },
    [coupons, setCoupons, addNotification]
  );

  const deleteCoupon = useCallback(
    (couponCode: string) => {
      setCoupons((prev) => removeCouponFromList(prev, couponCode));
      // 선택된 쿠폰이 삭제되면 선택 해제
      setSelectedCoupon((prev) => (prev?.code === couponCode ? null : prev));
      addNotification({ message: "쿠폰이 삭제되었습니다.", type: "success" });
    },
    [setCoupons, setSelectedCoupon, addNotification]
  );

  return {
    value: coupons,
    add: addCoupon,
    remove: deleteCoupon,
  };
}
