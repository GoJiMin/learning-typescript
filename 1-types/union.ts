{
  // Union Type
  // 그냥 OR 연산자 ..
  type FontSize = 8 | 16 | 24;

  const fontMd: FontSize = 16;

  console.log(fontMd);

  type FetchResponse = {
    status: 200;
    response: {
      body: string;
    };
  };

  type ErrorState = {
    status: 400;
    message: string;
  };

  type FetcherState = FetchResponse | ErrorState;

  function fetcher(url: string): Promise<FetcherState> {
    // code..

    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        response: {
          body: "response",
        },
      });
    });
  }

  function beforeFetcher(state: FetcherState): void {
    // 공통된 타입 속성이면서 다른 값으로 확실이 구분이되면 각 요소에 접근이 가능해진다..
    if (state.status === 200) {
      console.log("Request Success", state.response);
    } else {
      console.log("Request Failed", state.message);
    }
  }
}
