{
  interface ICoffee {
    name: string;
    shots: number;
    price: number;
    hasMilk: boolean;
    hasSyrup: boolean;
  }

  type TMenuList = "Americano" | "Latte" | "VanilaLatte";

  class CoffeeMachine {
    private static readonly BEANS_GRAM_PER_SHOT: number = 12;
    private static readonly Recipes: Record<TMenuList, ICoffee> = {
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
    };

    private coffeeBean: number;

    private constructor(coffeeBean: number) {
      this.coffeeBean = coffeeBean;
    }

    static installCoffeeMachine(coffeeBean: number) {
      return new CoffeeMachine(coffeeBean);
    }

    refill(coffeeBean: number) {
      if (coffeeBean < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBean += coffeeBean;
    }

    private makeCoffee(menu: TMenuList, neededBean: number): ICoffee {
      const coffee = CoffeeMachine.Recipes[menu];

      this.coffeeBean -= neededBean;
      return coffee;
    }

    order(menu: TMenuList): ICoffee {
      const neededBean =
        CoffeeMachine.Recipes[menu].shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;

      if (this.coffeeBean < neededBean) {
        throw new Error(
          `Not enough coffee beans! Required: ${neededBean}g, Available: ${this.coffeeBean}g`
        );
      }

      return this.makeCoffee(menu, neededBean);
    }
  }

  const coffeeMachine: CoffeeMachine = CoffeeMachine.installCoffeeMachine(50);

  const coffee = coffeeMachine.order("Americano");

  console.log(coffee);
}
