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

    makeCoffee(shots: number): ICoffee {
      this.grinding(shots);
      this.heating();

      return {
        shots,
        hasMilk: false,
      };
    }
  }

  class CheapMilkSteamer {
    private steamMilk() {
      console.log("Steaming some milk...");

      return true;
    }

    addMilk(coffee: ICoffee): ICoffee {
      const milk = this.steamMilk();

      return {
        ...coffee,
        hasMilk: milk,
      };
    }
  }

  class AutomaticSugarMixer {
    private getSugar() {
      console.log("Getting some sugar...");

      return true;
    }

    addSugar(coffee: ICoffee): ICoffee {
      const sugar = this.getSugar();

      return {
        ...coffee,
        hasSugar: sugar,
      };
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private milkFrother: CheapMilkSteamer) {
      super(beans);
    }

    makeCoffee(shots: number): ICoffee {
      const coffee = super.makeCoffee(shots);

      return this.milkFrother.addMilk(coffee);
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(beans: number, private sugarMixer: AutomaticSugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): ICoffee {
      const coffee = super.makeCoffee(shots);

      return this.sugarMixer.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      private milkFrother: CheapMilkSteamer,
      private sugarMixer: AutomaticSugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): ICoffee {
      const coffee = super.makeCoffee(shots);
      const addedSugar = this.sugarMixer.addSugar(coffee);

      return this.milkFrother.addMilk(addedSugar);
    }
  }

  const cheapMilkSteamer = new CheapMilkSteamer();
  const sugerMixer = new AutomaticSugarMixer();

  const coffeeMachine: ICoffeeMachine = new SweetCaffeLatteMachine(
    100,
    cheapMilkSteamer,
    sugerMixer
  );

  const sweetCaffeLatte = coffeeMachine.makeCoffee(2);

  console.log(sweetCaffeLatte);
}
