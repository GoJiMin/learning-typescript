{
  /**
   * 타입 확장은 기존의 타입을 사용해 새로운 타입을 정의하는 것을 말한다.
   * 기본적으로 타입스크립트는 type, interface를 사용해 타입을 정의하는데, extends, 교차 타입, 유니온 타입을 사용해 확장할 수 있다.
   */

  // extends
  interface BaseMenuItem {
    itemName: string | null;
    itemImageUrl: string | null;
    itemDiscountAmount: number;
    stock: number | null;
  }

  /**
   * 타입을 확장했을 때 얻을 수 있는 이점은 중복 코드 줄이기다.
   * 예를 들어 위의 BaseMenuItem을 확장해 장바구니에 들어있는 아이템 요소에 대한 타입을 지정한다면,
   * 아래와 같이 모든 요소를 포함하며 수량 정보를 추가한 타입을 정의할 수 있다.
   * 또, 한 눈에 봐도 BaseMenuItem을 확장해 정의한 타입이라는 것도 확인할 수 있다.
   *
   * 타입 확장은 중복 제거, 명시적인 코드 작성 외 확장성이란 장점도 포함한다.
   * 그렇기에 필요한 요구사항이 새로 생길 때마다 필요한 타입을 쉽게 정의할 수 있게 된다.
   */

  interface BaseCartItem extends BaseMenuItem {
    quantity: number;
  }

  interface EventCartItem extends BaseMenuItem {
    orderable: boolean;
  }

  // union
  interface CookingStep {
    orderId: string;
    price: number;
  }

  interface DeliveryStep {
    orderId: string;
    time: number;
    distance: string;
  }

  function getDeliveryDistance(step: CookingStep | DeliveryStep) {
    // return step.distance // Error
    return step.orderId;
  }

  /**
   * 유니온 타입을 사용해 타입을 확장하는 것도 가능하다.
   * 하지만 유니온 타입으로 확장된 타입은 두 타입이 공통으로 가지는 속성만 접근할 수 있다.
   * 위 함수에선 공통 속성이 아닌 distance에 접근한다면 에러를 발생시킨다.
   *
   * 위 함수의 매개변수인 step이라는 유니온 타입은 CookingStep 또는 DeliveryStep 타입에 해당할 뿐,
   * CookingStep이면서 DeliveryStep이라는 의미가 아니다.
   */

  // intersection
  interface CookingStep2 {
    orderId: string;
    time: number;
    price: number;
  }

  interface DeliveryStep2 {
    orderId: string;
    time: number;
    distance: string;
  }

  type Progress = CookingStep2 & DeliveryStep2;

  function getDeliveryDistance2(step: Progress) {
    return [step.price, step.distance];
  }

  /**
   * 교차 타입의 경우 유니온 타입과 반대로 두 타입을 모두 가진 단일 타입이 된다.
   * 즉, Progress라는 교차타입은 CookingStep2이면서 DeliveryStep2이다.
   */

  /**
   * 이제 메뉴 목록에 대한 타입을 직접 확장해보자.
   * 각 메뉴 목록은 이미지 url과 텍스트를 포함한다.
   *
   * 그럼 이 메뉴 목록을 사용자에게 표시하기 위해 다음과 같은 함수를 구성할 수 있다.
   */

  interface Menu {
    name: string;
    image: string;
  }

  function MainMenu() {
    const menuList: Menu[] = [
      { name: "1인분", image: "/image/1인분.png" },
      { name: "피자", image: "/image/피자.png" },
    ];

    // return (
    //     <ul>
    //       {menuList.map((menu) => (
    //         <li>
    //           <img src={menu.image}/ >
    //           <span>{menu.name}</span>
    //         </li>
    //       ))}
    //     </ul>
    // )
  }

  /**
   * 이 때, 2개의 요구사항이 추가되었을 때, 타입을 확장해보자.
   * 1. 특정 메뉴를 눌렀을 때, gif 파일을 재생한다.
   * 2. 특정 메뉴는 이미지 대신 별도의 텍스트만 노출한다.
   */

  interface SpecialMenu extends Menu {
    gif: string;
  }

  interface PackageMenu extends Menu {
    text: string;
  }

  const menuList = [
    { name: "1인분", image: "/image/1인분.png" },
    { name: "피자", image: "/image/피자.png" },
  ];

  const specialMenuList = [
    { name: "1인분", image: "/image/1인분.png", gif: "/image/1인분.gif" },
    { name: "피자", image: "/image/피자.png", gif: "/image/피자.gif" },
  ];

  const packageMenuList: PackageMenu[] = [
    { name: "1인분", image: "/image/1인분.png", text: "1인분" },
    { name: "피자", image: "/image/피자.png", text: "피자" },
  ];

  /**
   * 이제 위 메뉴리스트를 서버에서 받아왔다고 가정할 때, 타입은 아래와 같이 지정할 수 있게 된다.
   *
   * menuList: Menu[];
   * specialMenuList: SpecialMenu[];
   * packageMenuList: PackageMenu[];
   *
   * 이렇게 지정해두면 아래의 경우 타입에 포함되지 않는 속성에 접근할 때 바로 에러를 잡아낼 수 있다.
   */
  //   packageMenuList.map(menu => menu.gif)
}

interface CookingStep2 {
  orderId: string;
  time: number;
  price: number;
}

interface DeliveryStep2 {
  orderId: string;
  time: number;
  distance: string;
}

type Progress = CookingStep2 & DeliveryStep2;

function getDeliveryDistance2(step: Progress) {
  return [step.price, step.distance];
}
