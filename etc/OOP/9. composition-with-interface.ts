{
  interface ICoffee {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }

  interface ICoffeeMachine {
    makeCoffee(beans: number): ICoffee;
  }

  interface IMilkFrother {
    addMilk(coffee: ICoffee): ICoffee;
  }

  interface ISugarMixer {
    addSugar(coffee: ICoffee): ICoffee;
  }

  class CoffeeMachine implements ICoffeeMachine {
    private static readonly BEANS_GRAM_PER_SHOT: number = 12;

    constructor(
      private coffeeBeans: number,
      private milkFrother: IMilkFrother,
      private sugarMixer: ISugarMixer
    ) {}

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

    private extract(shots: number): ICoffee {
      console.log(`pulling ${shots} shots..`);

      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): ICoffee {
      this.grinding(shots);
      this.heating();

      const coffee = this.extract(shots);
      const addedSugar = this.sugarMixer.addSugar(coffee);

      return this.milkFrother.addMilk(addedSugar);
    }
  }

  class CheapMilkSteamer implements IMilkFrother {
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

  class FancyMilkSteamer implements IMilkFrother {
    private steamMilk() {
      console.log("Fancy Steaming some milk..✨");

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

  class ColdMilkSteamer implements IMilkFrother {
    private steamMilk() {
      console.log("Cold Steaming some milk...🧊");

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

  class NoMilk implements IMilkFrother {
    addMilk(coffee: ICoffee): ICoffee {
      return coffee;
    }
  }

  class AutomaticSugarMixer implements ISugarMixer {
    private getSugar() {
      console.log("Getting some sugar from jar...");

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

  class CandySugarMixer implements ISugarMixer {
    private getSugar() {
      console.log("Getting some sugar by smashing candy...");

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

  class NoSugar implements ISugarMixer {
    addSugar(coffee: ICoffee): ICoffee {
      return coffee;
    }
  }

  // milk
  const cheapMilkSteamer = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();
  const coldMilkSteamer = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // sugar
  const sugarMixer = new AutomaticSugarMixer();
  const candySugarMixer = new CandySugarMixer();
  const noSugar = new NoSugar();

  /**
   * dependency injection으로 받는 의존성 주입을 클래스로 타입을 선언하지 않고, interface로 규약하기 때문에,
   * 사용하는 입장에서 어떤 sugarMixer와 milkFrother를 전달해도 상관 없다. 그저 생성자 함수에 주입되는 의존성의 interface를 규약하는 클래스만 전달한다면, 그저 내부에 정의된 함수를 호출할 뿐이다.
   *
   * 이는 강결합되어있는 클래스들을 느슨하게 풀어 재사용성을 높인다.
   */
  const sweetCoffeeMachine: ICoffeeMachine = new CoffeeMachine(
    24,
    noMilk,
    sugarMixer
  );
  const sweetCandyCoffeeMachine: ICoffeeMachine = new CoffeeMachine(
    24,
    noMilk,
    candySugarMixer
  );

  const caffeLatteMachine: ICoffeeMachine = new CoffeeMachine(
    24,
    cheapMilkSteamer,
    noSugar
  );
  const fancyCaffeLatteMachine: ICoffeeMachine = new CoffeeMachine(
    24,
    fancyMilkSteamer,
    noSugar
  );

  const sweetCaffeLatteMachine: ICoffeeMachine = new CoffeeMachine(
    24,
    coldMilkSteamer,
    sugarMixer
  );
}
