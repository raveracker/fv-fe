export interface Review {
  _id: string;
  websiteId: string;
  title: string;
  link: string;
  subject: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewResponse {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
}
