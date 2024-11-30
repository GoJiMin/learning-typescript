{
  // Type Aliases

  type Text = string;

  const myName: Text = "jimin";

  type Num = number;

  const myAge: Num = 26;

  type Student = {
    name: Text;
    age: Num;
  };

  const student: Student = {
    name: "jimin",
    age: 26,
  };

  type Developer = {
    name: Text;
    age: Num;
  };

  let developer: Developer = student; // ?
  /**
   * 타입스크립트는 타입을 구조로 이해하기 때문..
   * Developer와 Student는 동일한 속성을 가진다.
   * 이 두 타입은 동일한 구조를 가지고 있기 때문에 타입스크립트는 이를 허용한다.
   * 자바스크립트의 덕타이핑을 모델로 삼았기 때문..
   */

  // String Literal Type

  type JiminName = "jimin";

  const jiminName: JiminName = "jimin"; // 다른 문자열 할당 불가.
}
