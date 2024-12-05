{
  interface ICoffee {
    name: string;
    shots: number;
    price: number;
    hasMilk: boolean;
    hasSyrup: boolean;
  }

  const Recipes = {
    Americano: {
      name: "Americano",
      shots: 2,
      hasMilk: false,
      hasSyrup: false,
      price: 2000,
    },
    Latte: {
      name: "Latte",
      shots: 2,
      hasMilk: true,
      hasSyrup: false,
      price: 3000,
    },
    VanilaLatte: {
      name: "VanilaLatte",
      shots: 1,
      hasMilk: true,
      hasSyrup: true,
      price: 3500,
    },
  } as const;

  type TMenuList = keyof typeof Recipes;

  class CoffeMachine {
    static BEANS_GRAM_PER_SHOT: number = 12;
    coffeeBean: number;

    constructor(coffeeBean: number) {
      this.coffeeBean = coffeeBean;
    }

    static installCoffeeMachine(coffeeBean: number) {
      return new CoffeMachine(coffeeBean);
    }

    refill(coffeeBean: number) {
      this.coffeeBean += coffeeBean;
    }

    order(menu: TMenuList): ICoffee {
      const neededBean = Recipes[menu].shots * CoffeMachine.BEANS_GRAM_PER_SHOT;

      if (this.coffeeBean < neededBean) {
        throw new Error(
          `Not enough coffee beans! Required: ${neededBean}g, Available: ${this.coffeeBean}g`
        );
      }

      this.coffeeBean -= neededBean;
      return Recipes[menu];
    }
  }

  const coffeeMachine: CoffeMachine = CoffeMachine.installCoffeeMachine(50);

  const coffee = coffeeMachine.order("Americano");

  console.log(coffee);
}
