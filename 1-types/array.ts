{
  // Array
  const strs: string[] = ["hi", "hello"]; // OK
  const strs2: Array<string> = ["hi", "hello"]; // OK

  function printSomething(string: readonly string[]) {
    string.forEach(console.log);
  } // readonly Array<string> 이거 안됨.

  // Tuple
  const developer: [string, number] = ["jimin", 26];
  developer[0]; // jimin
  developer[1]; // 26
  // 가독성 최악..이니까 차라리 이렇게라도.. useState도 이렇죠? 근데 useState는 튜플을 아주 예쁘게 사용한 예.. 유연하게 동작
  const [name, age] = developer;
}
