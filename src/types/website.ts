export interface Website {
  url: string;
  _id: string;
  isScam: boolean;
  riskFactor: string;
  rating: number;
  productOrService: string;
  businessCategory: string;
  targetAudience: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}
