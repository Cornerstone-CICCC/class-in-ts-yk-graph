enum Priority {
  Normal,
  Priority,
  Urgent,
}

abstract class Luggage {
  protected weight: number
  protected description: string
  protected priority: Priority
  protected readonly fee: number = 5.2

  constructor(weight: number, description: string, priority: Priority) {
    this.weight = weight
    this.description = description
    this.priority = priority
  }

  getWeight(): number {
    return this.weight
  }

  setWeight(weight: number): void {
    this.weight = weight
  }

  getDescription(): string {
    return this.description
  }

  getPriority(): Priority {
    return this.priority
  }

  getInsuranceValue(): number {
    return 0
  }

  setInsuranceValue(value: number): void {
    console.error('Insurance is only applicable to fragile luggage')
  }

  abstract getPrice(): number
  abstract toString(): string
}

class ListOfLuggages {
  private luggages: Luggage[] = []

  constructor() {
    this.luggages = []
  }

  insertLuggage(luggage: Luggage): void {
    this.luggages.push(luggage)
  }

  printAllLuggages(): void {
    this.luggages.forEach((luggage) => {
      console.log(luggage.toString())
    })
  }

  priceOfEachLuggage(): void {
    this.luggages.forEach((luggage) => {
      console.log(
        `${luggage.getDescription()}: $${luggage.getPrice().toFixed(2)}`,
      )
    })
  }

  totalPrice(): number {
    return this.luggages.reduce(
      (total, luggage) => total + luggage.getPrice(),
      0,
    )
  }

  getFragileLuggageWithInsurance(): {
    quantity: number
    totalInsurance: number
  } {
    const fragileLuggages = this.luggages.filter(
      (luggage) => luggage instanceof FragileLuggage,
    )
    const totalInsurance = fragileLuggages.reduce(
      (total, luggage) => total + luggage.getInsuranceValue(),
      0,
    )
    return {
      quantity: fragileLuggages.length,
      totalInsurance,
    }
  }

  sortByPrice(): void {
    this.luggages.sort((a, b) => a.getPrice() - b.getPrice())
  }

  sortByWeight(): void {
    this.luggages.sort((a, b) => a.getWeight() - b.getWeight())
  }
}

class CarryOnLuggage extends Luggage {
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

class FragileLuggage extends Luggage {
  private insurance: number

  constructor(
    weight: number,
    description: string,
    priority: Priority,
    insurance: number,
  ) {
    super(weight, description, priority)
    this.insurance = insurance
  }

  getInsuranceValue(): number {
    return this.insurance
  }

  setInsuranceValue(value: number): void {
    this.insurance = value
  }

  getPrice(): number {
    switch (this.priority) {
      case Priority.Normal:
        return this.insurance
      case Priority.Priority:
        return this.fee * 5 + this.insurance
      case Priority.Urgent:
        return this.fee * 10 + this.insurance
      default:
        return this.insurance
    }
  }

  toString(): string {
    return `Fragile Luggage: ${this.description} (Insurance: $${this.insurance})`
  }
}

class RegularLuggage extends Luggage {
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

// Example usage
const fragileLuggage = new FragileLuggage(
  10,
  'Box with fragile items',
  Priority.Normal,
  100,
)
const regularLuggage = new RegularLuggage(
  30,
  'Luggage full of clothes',
  Priority.Priority,
)
const carryOnLuggage = new CarryOnLuggage(
  6,
  'Luggage with personal items',
  Priority.Urgent,
)

const list = new ListOfLuggages()
list.insertLuggage(fragileLuggage)
list.insertLuggage(regularLuggage)
list.insertLuggage(carryOnLuggage)

console.log('=== All Luggages ===')
list.printAllLuggages()

console.log('\n=== Price of Each Luggage ===')
list.priceOfEachLuggage()

console.log('\n=== Total Price ===')
console.log(`Total: $${list.totalPrice().toFixed(2)}`)

console.log('\n=== Fragile Luggage Info ===')
const fragileInfo = list.getFragileLuggageWithInsurance()
console.log(
  `Quantity: ${fragileInfo.quantity}, Total Insurance: $${fragileInfo.totalInsurance}`,
)
