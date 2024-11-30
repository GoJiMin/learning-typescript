/**
 * Let's make a calculator 🧮
 */
{
  type Options = "add" | "subtract" | "multiply" | "divide" | "remainder";

  function calculate(action: Options, num1: number, num2: number): number {
    switch (action) {
      case "add":
        return num1 + num2;
      case "subtract":
        return num1 - num2;
      case "multiply":
        return num1 * num2;
      case "divide":
        return Math.floor(num1 / num2);
      case "remainder":
        return num1 % num2;
      default:
        throw new Error("unknow action");
    }
  }

  console.log(calculate("add", 1, 3)); // 4
  console.log(calculate("subtract", 3, 1)); // 2
  console.log(calculate("multiply", 4, 2)); // 8
  console.log(calculate("divide", 4, 2)); // 2
  console.log(calculate("remainder", 5, 2)); // 1
}
