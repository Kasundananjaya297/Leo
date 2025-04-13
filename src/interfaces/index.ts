/** @format */

export interface IUser {
  email: string;
  name: string;
  role: string;
  password: string;
  lastName: string;
  studentId: string;
  faculty: string;
  department: string;
  avenue: string;
  mobileNumber: string;
}
export interface IEvent {
  id?: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  avenue: string;
  description: string;
  content: string;
  contact: string;
  featuredImage: string;
  images: string[];
}
