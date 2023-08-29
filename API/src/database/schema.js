import { gql } from 'apollo-server';

const typeDefs = gql`
  # @QUERYS
  type Query {
    getAdvisors(search: String):[Advisor!]!
    getAdvisor(id: Int!): [Advisor!]
    
    getCommissionTypes:[CommissionType]
    getCommissionType: CommissionType!
    
    getSalaries:[Salary]
    getSalary: Salary!
    
    getMetrics:[Metric]
    getMetric: Metric!
    
    getSales:[Sale]
    getSale: Sale!

    getCommissions:[Commission]
    getCommission: Commission!
  }
  # @MUTATIONS
  type Mutation {
    createAdvisor(input: CreateAdvisorInput!): Advisor
    updateAdvisor(id: Int!, input: UpdateAdvisorInput!): String
    deleteAdvisor(id: Int!): String

    createSale(input: CreateSaleInput!): Sale
    updateSale(id: Int!, input: UpdateSaleInput!): String
    deleteSale(id: Int!): String

    createCommission(input: CreateCommissionInput!): Commission
    updateCommission(id: Int!, input: UpdateCommissionInput!): String
    deleteCommission(id: Int!): String

    createCommissionType(input: CreateCommissionTypeInput!): CommissionType
    updateCommissionType(id: Int!, input: UpdateCommissionTypeInput!): String
    deleteCommissionType(id: Int!): String

    createPerformanceMetrics(input: CreatePerformanceMetricsInput!): Metric
    updatePerformanceMetrics(id: Int!, input: UpdatePerformanceMetricsInput!): String
    deletePerformanceMetrics(id: Int!): String

    createSalary(input: CreateSalaryInput!): Salary
    updateSalary(id: Int!, input: UpdateSalaryInput!): String
    deleteSalary(id: Int!): String
  }
  # @INPUTS
    input CreateAdvisorInput {
    fullname: String!
    experience_level: String!
    contact_info: String!
    start_date: String!
    termination_date: String
    status: Int!
  }

  input UpdateAdvisorInput {
    fullname: String
    experience_level: String
    contact_info: String
    start_date: String
    termination_date: String
    status: Int!
  }
  
  input DeleteAdvisorInput {
    id: Int!
  }
  
  input CreateSaleInput {
    advisor_id: Int!
    amount: Float!
  }

  input UpdateSaleInput {
    advisor_id: Int
    amount: Float
  }

  input DeleteSaleInput {
    id: Int!
  }

  input CreateCommissionInput {
    advisor_id: Int!
    sale_id: Int!
    amount: Float!
  }

  input UpdateCommissionInput {
    advisor_id: Int
    sale_id: Int
    amount: Float
  }

  input DeleteCommissionInput {
    id: Int!
  }

  input CreateCommissionTypeInput {
    description: String!
  }

  input UpdateCommissionTypeInput {
    description: String
  }

  input DeleteCommissionTypeInput {
    id: Int!
  }

  input CreatePerformanceMetricsInput {
    advisor_id: Int!
    month: String!
    sales_amount: Float!
    commission_earned: Float!
  }

  input UpdatePerformanceMetricsInput {
    advisor_id: Int
    month: String
    sales_amount: Float
    commission_earned: Float
  }

  input DeletePerformanceMetricsInput {
    id: Int!
  }

  input CreateSalaryInput {
    advisor_id: Int!
    monthly_salary: Float!
    health_deduction: Float!
    pension_deduction: Float!
    risk_deduction: Float!
  }

  input UpdateSalaryInput {
    advisor_id: Int
    monthly_salary: Float
    health_deduction: Float
    pension_deduction: Float
    risk_deduction: Float
  }

  input DeleteSalaryInput {
    id: Int!
  }
  # @TYPE_DEFINITIONS
  type Advisor {
    advisor_id: Int
    fullname: String
    experience_level: String
    contact_info: String
    start_date: String
    termination_date: String
    status: Int
  }
  type CommissionType {
    id: Int
    description: String
  }
  type Sale {
    id: Int 
    advisor_id: Int
    amount: Float
  }
  type Commission {
    id: Int
    advisor_id: Int
    sale_id: Int
    amount: Float
  }
  type Salary {
    id: Int
    advisor_id: Int
    monthly_salary: Float
    health_deduction: Float
    pension_deduction: Float
    risk_deduction: Float
  }
  type Metric {
    id: Int
    advisor_id: Int
    month: String
    sales_amount: Float
    commission_earned: Float
  }
`;

export default typeDefs;
