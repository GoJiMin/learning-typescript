{
  // 원시 타입을 추론할 때에는 typeof 연산자를 활용.
  // typeof A === B의 경우 A의 타입이 B와 같은지 판별 가능.
  // 하지만 아래와 같이 자바스크립트의 동작 방식으로 인해 null이 object 타입으로 판별되는 등 한계가있음.
  if (typeof null === "object") {
    console.log("hi");
  }

  function isNumeric(n: number | string) {
    if (typeof n === "number") {
      console.log(`${n} is Numeric`);
    } else {
      console.log(`${n} is not Numeric`);
    }
  }

  isNumeric(5);
  isNumeric("5");

  // ====================================================================================
  // 인스턴스화된 객체 타입을 판별할 때에는 instanceof 연산자를 활용.
  // A instanceof B의 경우 A의 프로토타입 체인에 생성자 B가 존재하는지 검사해 true 혹은 false를 반환.
  // 아래 함수의 경우 전달된 event 타겟이 HTMLInputElement이며, 눌린 키가 엔터일 경우 blur 메서드를 사용할 수 있도록 분기처리하고 있다.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement && event.key === "Enter") {
      event.target.blur();
    }
  };

  // ====================================================================================
  // 객체의 속성이 있는지 확인하기 위해 in 연산자를 활용.
  // in 연산자는 객체에 속성이 있는지 확인해 true 혹은 false를 반환한다.
  // A in B 형태로 사용하며 A 속성이 B 객체에 존재하는지 검사한다.

  interface BasicNoticeDialog {
    noticeTitle: string;
    noticeBody: string;
  }

  interface NoticeDialogWithCookieProps extends BasicNoticeDialog {
    cookieKey: string;
    noForADay?: boolean;
    neverAgain?: boolean;
  }

  type NoticeDialogProps = BasicNoticeDialog | NoticeDialogWithCookieProps;
  // 위와 같이 일반적인 다이얼로그 프롭과 쿠키 정보를 포함한 다이얼로그를 하나의 함수로 처리하고 싶다면
  // 쿠키를 포함한 다이얼로그에 추가된 cookieKey가 객체에 있는지 판단해 분기처리할 수 있다.

  function RenderNoticeDialog(props: NoticeDialogProps) {
    if ("cookieKey" in props) {
      // ~~
    }
  }

  // ====================================================================================
  // is 연산자로 사용자 정의 타입 가드 만들기
  // 연산자를 활용할 수도 있고, 직접 타입 가드 함수를 만들 수도 있다.
  // 반환 타입이 타입 명제인 함수를 정의해 사용할 수 있는데, A is B 형태로 작성하면 된다.

  type Food = string;

  const food: Food[] = ["햄버거", "초밥", "피자"];

  // 함수의 반환 값을 x is Food로 타이핑한다.
  // 이후 이 함수가 사용되는 곳의 타입을 추론할 때 이 조건을 타입 가드로 사용하도록 알려준다.
  function isFood(x: string): x is Food {
    return food.includes(x);
  }

  function getFoodList(): Food[] {
    const data: string[] = ["피자", "커피", "음료수", "덤벨"];

    const foodList: Food[] = [];
    data.forEach((str) => {
      if (isFood(str)) {
        foodList.push(str);
      }
    });

    return foodList;
  }

  console.log(getFoodList());

  // 식별할 수 있는 유니온 (Discriminated Unions)

  type TextError = {
    errorType: "TEXT";
    errorCode: string;
    errorMessage: string;
  };

  type ToastError = {
    errorType: "TOAST";
    errorCode: string;
    errorMessage: string;
    toastShowDuration: number;
  };

  type AlertError = {
    errorType: "ALERT";
    errorCode: string;
    errorMessage: string;
    onConfirm: () => void;
  };

  type ErrorFeedbackType = TextError | ToastError | AlertError;
  const errorArr: ErrorFeedbackType[] = [
    { errorType: "TEXT", errorCode: "100", errorMessage: "텍스트 에러" },
    {
      errorType: "TOAST",
      errorCode: "200",
      errorMessage: "토스트 에러",
      toastShowDuration: 3000,
    },
    {
      errorType: "ALERT",
      errorCode: "300",
      errorMessage: "얼럿 에러",
      onConfirm: () => {},
    },
    // {
    //   errorCode: "400",
    //   errorMessage: "이건 무슨 에러일까?",
    //   toastShowDuration: 400000,
    //   onConfirm: () => {},
    // },
  ];
  // 위와 같이 에러를 3개의 종류로 나눴을 때 ErrorFeedbackType은 3가지 종류의 에러를 모두 담을 수 있는 유니온 타입으로 선언될 수 있다.
  // 그래서 errorArr에 ErrorFeedbackType[] 처럼 이 에러를 모두 담을 수 있는 배열 타입을 선언해 모든 에러를 담을 수 있게 된다.

  // 하지만 문제가 있다.. 자바스크립트는 덕 타이핑 언어이기 때문에, 마지막 에러와 같이 모든 에러 필드의 속성을 다 가진 이상한 에러도 타입스크립트가 잡아주지 않는다.
  // 이 때, 판별자를 추가해 식별할 수 있는 유니온 타입을 만들 수 있다.
  // 이 판별자는 유닛 타입으로 선언되어야만 하는데, 이 유닛 타입은 쪼개지지 않고 오직 하나의 정확한 값을 가지는 타입이다.
  // 예를 들어, 판별자로 errorType이라는 속성을 사용하는데, string 타입으로 선언된다면,
  // 이는 모든 string 타입의 무언가가 올 수 있어 정확히 판별할 수 없다.

  // Exhaustiveness Checking으로 정확한 타입 분기 유지.
  // Exhaustiveness Checking이란 모든 케이스에 대해 철저하게 타입을 검사하는 것을 말하는데,
  // 예시를 보고 정확히 이해해보자.

  type Directons = "UP" | "DOWN";

  function move(direction: Directons) {
    switch (direction) {
      case "UP":
        console.log("up!");
        break;
      case "DOWN":
        console.log("down!");
        break;
      default:
        const _exhaustive: never = direction;
        throw new Error("unknown type error!");
    }
  }

  // 위와 같이 움직이는 함수가 있고, 좌표에 대한 모든 분기처리를 해주고 있다.
  // 그런데 만약 움직일 수 있는 방법으로 LEFT, RIGHT가 추가됐을 때, 함수 수정을 깜빡한다면,
  // 런타임 에러로 이어질 것이다. 이 때, 사용할 수 있는 방법으로 타입 검사를 강제하는 방법이 있는데,
  // 위와 같이 direction에 LEFT 타입이 추가되었을 때, 이 조건에 대한 분기처리를 해주지 않는다면, direction이 타고 내려와
  // 할당할 수 없는 never 타입이 되어버려 에러를 발생시킨다.
  // 하지만 추가된 타입에 대한 분기처리를 해주면 사실상 정말 내려올 수 없는 never 타입이기 때문에 에러가 발생하지 않는다.
}
