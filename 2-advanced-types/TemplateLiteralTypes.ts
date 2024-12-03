{
  type Stage =
    | "init"
    | "select-image"
    | "edit-image"
    | "decorate-card"
    | "capture-image";

  /**
   * 자바스크립트의 템플릿 리터럴 문자열을 사용해 문자열 리터럴 타입을 선언할 수 있다.
   * 아래 처럼 템플릿 리터럴 문자열로 미리 정의한 유니온 타입 멤버 이름 뒤에 "-stage"를 추가할 수 있다.
   */

  type StageName = `${Stage}-stage`;

  /**
  type StageName =
    | "init-stage" 
    | "select-image-stage" 
    | "edit-image-stage" 
    | "decorate-card-stage" 
    | "capture-image-stage"
   */
}
