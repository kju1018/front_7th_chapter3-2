import { atom } from "jotai";
import { Notification } from "../../types";

// 알림 목록 상태
export const notificationsAtom = atom<Notification[]>([]);

// 알림 추가 write-only atom
export const addNotificationAtom = atom(
  null,
  (
    get,
    set,
    {
      message,
      type = "success",
    }: {
      message: string;
      type?: "error" | "success" | "warning";
    }
  ) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
    };

    set(notificationsAtom, [...get(notificationsAtom), newNotification]);
  }
);

// 알림 제거 write-only atom
export const removeNotificationAtom = atom(null, (get, set, id: string) => {
  set(
    notificationsAtom,
    get(notificationsAtom).filter((n) => n.id !== id)
  );
});
