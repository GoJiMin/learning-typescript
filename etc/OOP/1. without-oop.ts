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

  const BEANS_GRAM_PER_SHOT = 12;

  let coffeeBean: number = 1000;

  function order(menu: TMenuList): ICoffee {
    const neededBean = Recipes[menu].shots * BEANS_GRAM_PER_SHOT;

    if (coffeeBean < neededBean) {
      throw new Error("Not enough coffee beans!");
    }

    coffeeBean -= neededBean;
    return Recipes[menu];
  }

  function refill() {
    coffeeBean = 1000;
  }

  for (let i = 0; i < 150; i++) {
    try {
      order("Americano");
    } catch {
      refill();
    }
  }

  console.log(coffeeBean);
}
