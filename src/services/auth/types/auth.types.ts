export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  companyPlan?: 'basic' | 'pro' | 'enterprise';
}

export interface MyJwtPayload {
  id: string;
  email: string;
  role: string;
  companyId: string;
}
