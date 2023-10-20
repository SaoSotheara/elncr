export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  phoneNumber?: string;
  email: string;
  isVerified: boolean;
  company?: { [key: string]: any };
  [key: string]: any;
};
