{
  type Developer = {
    faceValue: number;
    sleepTime: number;
  };

  type human = {
    name: string;
    age: number;
  };

  type CodingSlave = Developer & human;

  function codingSlaveMaker(
    person: CodingSlave
  ): CodingSlave & { workingHours: number } {
    return {
      ...person,
      workingHours: 24,
    };
  }

  codingSlaveMaker({
    name: "jimin",
    age: 26,
    faceValue: 65,
    sleepTime: 4,
  });
}
