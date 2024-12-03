{
  /**
   * 어떤 타입이 가지는 속성의 이름은 모르지만, 타입의 속성값에 대한 타입은 알 때 사용.
   * [Key: K]: T;
   * 일 때 해당 타입의 속성의 key는 K 타입이어야 하고, 값에 해당하는 타입은 모두 T 타입을 가져야 함.
   */
  interface IndexSignatureEx {
    [key: string]: number;
    age: number;
    sleepTime: number;
    workTime: number;
    // name: string;  error
  }
}
