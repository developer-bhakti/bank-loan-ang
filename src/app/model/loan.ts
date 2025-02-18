export interface ILoan {
  applicantID: number
  fullName: string
  applicationStatus: string
  panCard: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  annualIncome: number
  employmentStatus: string
  creditScore: number
  assets: string
  dateApplied: string
  Loans: any;
  customerId: number
}

export interface IAPIResponse {
   message: string
   result: boolean
   data: any
}

export interface IUser {
  userId: number
  userName: string
  emailId: string
  fullName: string
  role:string
  createdDate: string
  password: string
  projectName: string
  refreshToken: any
  refreshTokenExpiryTime: any
}

export interface IApplicationList {
  applicationId: number
  dateApplied: string
  applicationStaus: string
  fullName: string
  email:string
  employmentStatus: string
  customerPhone: string
  assignedToBankEmployee: string
}
