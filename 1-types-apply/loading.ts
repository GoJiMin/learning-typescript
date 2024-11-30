{
  type LoadingState = {
    state: "loading";
  };

  type SuccessState = {
    state: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    state: "fail";
    reason: string;
  };

  type ResourceLoadState = LoadingState | SuccessState | FailState;

  function printLoginState(loginState: ResourceLoadState) {
    let message: string;

    switch (loginState.state) {
      case "success":
        message = loginState.response.body;
        break;
      case "fail":
        message = loginState.reason;
        break;
      case "loading":
        message = "Loading...";
        break;
      default:
        throw new Error(`unknown ${loginState}`);
    }

    console.log(message);
  }

  printLoginState({ state: "loading" });
  printLoginState({ state: "success", response: { body: "loaded" } });
  printLoginState({ state: "fail", reason: "no network" });
}
