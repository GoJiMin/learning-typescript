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

  interface ICommercialCoffeeMachine {
    order(menu: TMenuList): ICoffee;
    refill(coffeeBean: number): void;
    clean(): void;
  }

  type TMenuList = "Americano" | "Latte" | "VanilaLatte";

  class CoffeeMachine implements ICoffeeMachine, ICommercialCoffeeMachine {
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

    protected constructor(coffeeBean: number) {
      this.coffeeBean = coffeeBean;
    }

    static installCoffeeMachine(coffeeBean: number): CoffeeMachine {
      return new this(coffeeBean);
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

    clean() {
      console.log("Cleaning the machine...");
    }
  }

  class HighEndCoffeeMachine extends CoffeeMachine {
    autoRefill() {
      console.log("Auto-refilling coffee beans...");
      super.refill(150);
    }

    order(menu: TMenuList): ICoffee {
      try {
        return super.order(menu);
      } catch {
        this.autoRefill();

        return super.order(menu);
      }
    }
  }

  const maker: ICoffeeMachine = HighEndCoffeeMachine.installCoffeeMachine(10);

  const coffee = maker.order("Americano");

  console.log(coffee);
}
