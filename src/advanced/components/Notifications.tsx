import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { NotificationItem } from "./ui/NotificationItem";
import { notificationsAtom, removeNotificationAtom } from "../atoms";

const Notifications = () => {
  const notifications = useAtomValue(notificationsAtom);
  const removeNotification = useSetAtom(removeNotificationAtom);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // 알림 자동 제거 (3초 후)
  useEffect(() => {
    notifications.forEach((notif) => {
      // 이미 타이머가 설정된 알림은 건너뛰기
      if (timersRef.current.has(notif.id)) {
        return;
      }

      const timer = setTimeout(() => {
        removeNotification(notif.id);
        timersRef.current.delete(notif.id);
      }, 3000);

      timersRef.current.set(notif.id, timer);
    });

    // 제거된 알림의 타이머 정리
    const currentIds = new Set(notifications.map((n) => n.id));
    timersRef.current.forEach((timer, id) => {
      if (!currentIds.has(id)) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
    });

    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notif) => (
        <NotificationItem
          key={notif.id}
          variant={notif.type}
          message={notif.message}
          onClose={() => {
            const timer = timersRef.current.get(notif.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(notif.id);
            }
            removeNotification(notif.id);
          }}
        />
      ))}
    </div>
  );
};

export default Notifications;
