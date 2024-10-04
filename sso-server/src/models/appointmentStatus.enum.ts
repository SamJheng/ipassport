export enum AppointmentStatus {
  PENDING = 'PENDING', // 待確認
  CONFIRMED = 'CONFIRMED', // 已確認
  CANCELLED = 'CANCELLED', // 已取消
  COMPLETED = 'COMPLETED', // 已完成
  NO_SHOW = 'NO_SHOW', // 未出席
  RESCHEDULED = 'RESCHEDULED', // 重新安排
  WAITING = 'WAITING', // 等待中
  REJECTED = 'REJECTED', // 已拒絕
}
