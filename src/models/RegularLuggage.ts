import { Luggage } from './Luggage'
import { Priority } from '../types/Priority'

export class RegularLuggage extends Luggage {
  constructor(weight: number, description: string, priority: Priority) {
    super(weight, description, priority)
  }

  getPrice(): number {
    if (this.weight <= 23) {
      return 0
    }
    const extraWeight = this.weight - 23
    switch (this.priority) {
      case Priority.Normal:
        return this.fee * extraWeight
      case Priority.Priority:
        return this.fee * 5 * extraWeight
      case Priority.Urgent:
        return this.fee * 10 * extraWeight
      default:
        return this.fee * extraWeight
    }
  }

  toString(): string {
    return `Regular Luggage: ${this.description}`
  }
}
