{
  interface ICoffee {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }

  interface ICoffeeMachine {
    makeCoffee(beans: number): ICoffee;
  }

  abstract class CoffeeMachine implements ICoffeeMachine {
    private static readonly BEANS_GRAM_PER_SHOT: number = 12;

    constructor(private coffeeBeans: number) {}

    private grinding(shots: number) {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }

      console.log(`grinding beans for ${shots} shots`);

      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private heating(): void {
      console.log("heating up..");
    }

    protected abstract extract(shots: number): ICoffee;

    makeCoffee(shots: number): ICoffee {
      this.grinding(shots);
      this.heating();

      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    private addMilk() {
      console.log("Steaming some milk...");
    }

    protected extract(shots: number): ICoffee {
      this.addMilk();

      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    private addSugar() {
      console.log("Getting some sugar...");
    }

    protected extract(shots: number): ICoffee {
      this.addSugar();

      return {
        shots,
        hasSugar: true,
      };
    }
  }

  const machines: ICoffeeMachine[] = [
    new CaffeLatteMachine(44),
    new SweetCoffeeMachine(54),
  ];

  machines.forEach((machine) => {
    console.log(machine.makeCoffee(2));
  });
}
