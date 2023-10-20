import dayjs from 'dayjs';

export const isAfter = (date: Date): boolean => {
  return dayjs().isAfter(date);
};
