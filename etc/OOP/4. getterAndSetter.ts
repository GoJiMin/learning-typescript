{
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    private internalAge = 19;

    get age(): number {
      return this.internalAge;
    }

    set age(num: number) {
      if (num < 0) {
        throw new Error("enter the normal range.");
      }

      this.internalAge = num;
    }

    constructor(private firstName: string, private lastName: string) {}
  }

  const user1 = new User("Jimin", "Go");

  console.log(user1.fullName);

  user1.age = 26;

  console.log(user1.age);
}
