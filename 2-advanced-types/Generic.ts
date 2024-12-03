{
  /**
     * 제네릭은 함수, 타입, 클래스 등 내부적으로 사용할 타입을 미리 정해두지 않고
       타입 변수를 사용해 해당 위치를 비워둔 뒤, 실제로 사용할 때 외부에서 타입 변수
       자리에 타입을 지정해 사용하는 방식.
       미리 정해두지 않고 사용할 때 타입을 지정해주기 때문에 재사용성 향상.
     */

  // <T>와 같이 꺽쇠괄호 안에 정의되며, 사용할 때는 함수에 매개변수를 넣는 것과 유사하게 타입을 넣는다.
  type ExampleArrayType<T> = T[];

  const array1: ExampleArrayType<string> = ["치킨", "피자", "햄버거"];

  function exampleFunc<T>(arg: T): T[] {
    return new Array(3).fill(arg);
  }

  // 반드시 호출할 필요는 없음. 타입스크립트가 알아서 추론.
  // 근데 그냥 명시하는게,...
  exampleFunc("hello"); // ["hello", "hello", "hello"]

  /**
   * 제네릭은 미리 정해두지 않고 사용할 때 타입을 지정해준다.
   * 그럼 arg는 어떤 타입도 될 수 있는 것이다.
   * 그럼 만약 length라는 속성이 없는 타입이 매개변수로 주어질 수 있으니 아래의 경우 에러를 내뿜는다.
   */
  // function exampleFunc2<T>(arg: T): T[] {
  //   // return Array(3).fill(arg.length);
  // } 에러

  //그럼 아래와 같이 length 속성을 가진 타입만 받도록 제약을 걸어 해결할 수 있다.
  interface TypeWithLength {
    length: number;
  }

  function exampleFunc3<T extends TypeWithLength>(arg: T): T[] {
    return Array(3).fill(arg.length); // OK
  }

  // TSX 확장자 파일에서 화살표 함수에 제네릭을 사용하면 JSX 문법과 충돌해 에러가 발생..
  const exampleFunc4 = <T>(arg: T): T[] => {
    return Array(3).fill(arg);
  };

  // 이렇게 {}를 상속하거나, 그냥 function으로 만들기
  const exampleFunc5 = <T extends {}>(arg: T): T[] => {
    return Array(3).fill(arg);
  };

  /**
   * 아래와 같이 제네릭을 사용하면 매개변수, 반환값 등 다양한 곳에 타입을 지정해줄 수 있음.
   */

  type ObjectType<T> = {
    // doSomething...
  };

  type EntitySchema<T> = {
    // doSomething...
  };

  type Repository<T> = {
    // doSomething...
    path: Array<T>[];
  };

  function ReadOnlyRepository<T>(
    target: ObjectType<T> | EntitySchema<T> | string
  ): Repository<T> {
    return { path: [] };
  }

  type ErrorCodeType = {};

  /**
   * 제한된 제네릭
   
   * 아래와 같이 타입 매개변수 Key를 string 타입으로 제약하려면 특정 타입을 상속(extends)
     하도록 해야한다.
   * 이처럼 타입 매개변수가 특정 타입으로 묶였을 때 키를 바운드 타입 매개변수라고 부르며, string
     을 키의 상한 한계라고 한다.
   * 특정 타입뿐만 아니라, 상황에 따라 인터페이스나 클래스도 사용이 가능하며, 유니온 타입을 상속해 선언도 가능하다.
   */
  type ErrorRecord<Key extends string> = Exclude<
    Key,
    ErrorCodeType
  > extends never
    ? Partial<Record<Key, boolean>>
    : never;
}
