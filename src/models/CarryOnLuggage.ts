import { Luggage } from './Luggage'
import { Priority } from '../types/Priority'

export class CarryOnLuggage extends Luggage {
  constructor(weight: number, description: string, priority: Priority) {
    super(weight, description, priority)
  }

  getPrice(): number {
    if (this.weight <= 5) {
      return 0
    }
    const extraWeight = this.weight - 5
    return this.fee * 3 * extraWeight
  }

  toString(): string {
    return `Carry-on Luggage: ${this.description}`
  }
}
