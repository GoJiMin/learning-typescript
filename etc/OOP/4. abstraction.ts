{
  interface ICoffee {
    name: string;
    shots: number;
    price: number;
    hasMilk: boolean;
    hasSyrup: boolean;
  }

  interface ICoffeeMachine {
    order(menu: TMenuList): ICoffee;
  }

  type TMenuList = "Americano" | "Latte" | "VanilaLatte";

  class CoffeeMachine implements ICoffeeMachine {
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

    makeCoffee(menu: TMenuList): ICoffee {
      const coffee = CoffeeMachine.Recipes[menu];

      return coffee;
    }

    grindBeans(menu: TMenuList) {
      const neededBean =
        CoffeeMachine.Recipes[menu].shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;

      if (this.coffeeBean < neededBean) {
        throw new Error(
          `Not enough coffee beans! Required: ${neededBean}g, Available: ${this.coffeeBean}g`
        );
      }

      console.log(
        `grinding beans for ${CoffeeMachine.Recipes[menu].shots} shots`
      );

      this.coffeeBean -= neededBean;
    }

    order(menu: TMenuList): ICoffee {
      this.grindBeans(menu);

      return this.makeCoffee(menu);
    }
  }

  const coffeeMachine1: CoffeeMachine = CoffeeMachine.installCoffeeMachine(50);

  const coffee1 = coffeeMachine1.refill(50);

  coffeeMachine1.refill(50);

  const coffeeMachine2: ICoffeeMachine = CoffeeMachine.installCoffeeMachine(50);

  const coffee2 = coffeeMachine2.order("Americano");

  // coffeeMachine2.refill(50) Error
}
