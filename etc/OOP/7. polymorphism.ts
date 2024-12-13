{
  interface ICoffee {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }

  interface ICoffeeMachine {
    makeCoffee(beans: number): ICoffee;
  }

  class CoffeeMachine implements ICoffeeMachine {
    private static readonly BEANS_GRAM_PER_SHOT: number = 12;

    constructor(private coffeeBeans: number) {}

    grinding(shots: number) {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      console.log(`grinding beans for ${shots} shots`);

      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    heating(): void {
      console.log("heating up..");
    }

    makeCoffee(shots: number): ICoffee {
      this.grinding(shots);
      this.heating();

      return {
        shots,
        hasMilk: false,
      };
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    makeCoffee(shots: number): ICoffee {
      const coffee = super.makeCoffee(shots);

      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    makeCoffee(shots: number): ICoffee {
      const coffee = super.makeCoffee(shots);

      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  const machines: ICoffeeMachine[] = [
    new CoffeeMachine(24),
    new CaffeLatteMachine(44),
    new SweetCoffeeMachine(54),
  ];

  machines.forEach((machine) => {
    console.log(machine.makeCoffee(2));
  });
}
