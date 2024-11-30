{
  // in Javascript
  // function addNumJS(numA, numB) {
  //   return numA + numB;
  // }

  // const inJavascript = addNumJS(1, 5);

  // in Typescript
  function addNumTS(numA: number, numB: number): number {
    return numA + numB;
  }

  const inTypescript = addNumTS(1, 5);

  // in Javascript
  // function fetchJS(id) {
  //   /**
  //    * ...
  //    */

  //   return new Promise((resolve, reject) => {
  //     resolve(id);
  //   });
  // }

  // in Tavascript
  function fetchTS(id: string): Promise<string> {
    /**
     * ...
     */

    return new Promise((resolve, reject) => {
      resolve(id);
    });
  }

  // Optional
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName("Jimin", "Go"); // Ok
  printName("Jimin"); // Ok

  // Default
  function printMessage(message: string = "default Message") {
    console.log(message);
  }

  printMessage(); // default Message
  printMessage("hi"); // hi

  // Rest
  function addNums(...rest: number[]): number {
    return rest.reduce((acc, cur) => (acc += cur), 0);
  }

  addNums(1, 2, 3, 4, 5, 6);
  addNums(1, 2, 3);
}
