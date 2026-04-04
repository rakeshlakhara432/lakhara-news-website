import { db } from '../data/database';

export type NotificationType = 'order' | 'news' | 'promo' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

class NotificationService {
  public async sendNotification(type: NotificationType, title: string, message: string, link?: string) {
    const notifications = JSON.parse(localStorage.getItem('lakhara_notifications') || '[]');
    const newNotification: Notification = {
      id: `NOTIF-${Date.now()}`,
      type,
      title,
      message,
      createdAt: new Date().toISOString(),
      isRead: false,
      link
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('lakhara_notifications', JSON.stringify(notifications.slice(0, 50)));
    console.log(`[NOTIF] ${title}: ${message}`);
  }

  public getNotifications(): Notification[] {
    return JSON.parse(localStorage.getItem('lakhara_notifications') || '[]');
  }
}

export const notificationService = new NotificationService();
