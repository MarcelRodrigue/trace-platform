export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  companyPlan?: 'basic' | 'pro' | 'enterprise';
}
