{
  type Example = {
    a: number;
    b: string;
    c: boolean;
  };

  /**
   * Example의 경우.
   *
   * 제네릭으로 Example 타입을 받음.
   * keyof Example을 통해 속성의 모든 키를 문자열 리터럴 유니온 타입으로 변환함.
   * [K in keyof "a" | "b" | "c"]?: Example[K];
   * 그럼 모든 속성이 옵셔널 형태로 변환됨.
   */
  type Subset<T> = {
    [K in keyof T]?: T[K];
  };

  const aExample: Subset<Example> = { a: 3 };
  const bExample: Subset<Example> = { b: "hello" };
  const cExample: Subset<Example> = { a: 5, c: true };

  /**
   * 반대로 readonly 속성을 제거할 수도 있음.
   * - 부호를 앞에 붙여주면 제거된 속성을 매핑해 새로운 타입을 생성함.
   */
  type ReadOnlyEx = {
    readonly a: number;
    readonly b: string;
  };

  type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
  };

  type ResultType = CreateMutable<ReadOnlyEx>;

  /**
   * 마찬가지로 옵셔널 속성을 제거할 수도 있음.
   */
  type OptionalEx = {
    a?: number;
    b?: string;
    c?: boolean;
  };

  type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property];
  };

  type ResultType2 = Concrete<OptionalEx>;

  // 각 키의 값으로 문자열을 할당했지만 실제로 resolver, args, isOpened 속성을 가지는 스토어라고 가정.
  const BottomSheetMap = {
    RECENT_CONTACTS: "RecentContactsBottonSheet",
    CARD_SELECT: "CardSelectBottomSheet",
    SORT_FILTER: "SortFilterBottomSheet",
    PRODUCT_SELECT: "ProductSelectBottomSheet",
    REPLY_CARD_SELECT: "ReplyCardSelectBottomSheet",
    RESEND: "ResendBottomSheet",
    // ... 더 많은 항목
  };

  // 그럼 각 스토어마다 타입을 설정해줘야한다.
  type BottomSheetStore = {
    RECENT_CONTACTS: {
      resolver?: (payload: any) => void;
      args?: any;
      isOpened: boolean;
    };
    CARD_SELECT: {
      resolver?: (payload: any) => void;
      args?: any;
      isOpened: boolean;
    };
    SORT_FILTER: {
      resolver?: (payload: any) => void;
      args?: any;
      isOpened: boolean;
    };
    // ... 더 많은 항목
  };

  /**
   * typeof BottomSheetMap은 object를 가리킨다.
   * 그럼 keyof를 통해 이 오브젝트의 키 값들을 모두 빼올 수 있다.
   * 이후 각 키 값을 모두 순회하며 위에서 하드코딩한 타입을 모두 매핑하면 된다.
   */
  type BOTTOM_SHEET_ID = keyof typeof BottomSheetMap;

  type BottomSheetStoreMapped = {
    // as 키워드로 키를 재지정하는 것도 OK.
    [index in BOTTOM_SHEET_ID as `${index}_BOTTOM_SHEET`]: {
      resolver?: (payload: any) => void;
      args?: any;
      isOpened: boolean;
    };
  };
}
