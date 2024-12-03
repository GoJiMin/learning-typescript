{
  /**
   * 인덱스트 엑세스 타입은 다른 타입의 특정 속성이 가지는 타입을 조회하기 위해 사용.
   */
  type Example = {
    a: number;
    b: string;
    c: boolean;
  };

  type IndexedAccess = Example["a"]; // number
  type IndexedAccess2 = Example["a" | "b"]; // number | string
  type IndexedAccess3 = Example[keyof Example]; // number | string | boolean

  type ExAlias = "b" | "c";
  type IndexedAccess4 = Example[ExAlias]; // string | boolean

  const PromotionList = [
    { type: "product", name: "chicken" },
    { type: "product", name: "pizza" },
    { type: "card", name: "cheer-up" },
  ];

  type ElementOf<T extends readonly any[]> = T[number];

  // type PromotionItemType = { type: string; name: string }
  type PromotionItemType = Partial<typeof PromotionList>;
}
