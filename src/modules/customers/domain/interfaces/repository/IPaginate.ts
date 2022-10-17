import { ICustomer } from '../models/ICustomer'

export interface IPaginate {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null | undefined
  next_page: number | null | undefined
  last_page: number | undefined
  data: ICustomer[]
}
