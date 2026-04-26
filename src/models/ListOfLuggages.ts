import { FragileLuggage } from './FragileLuggage'
import type { Luggage } from './Luggage'

export class ListOfLuggages {
  private luggages: Luggage[] = []

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
