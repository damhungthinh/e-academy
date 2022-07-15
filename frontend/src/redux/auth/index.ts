import { User } from "@entity/user";
import { LoginRequest } from "@entity/user/request";
import { createModel } from "@rematch/core";
import { apiErrorHandler, CustomError } from "@utils/apiErrorHandler";
import { fetch } from "@utils/axiosFetch";
import { RootModel } from "..";

type AuthState = {
  token: string,
  user?: User,
  error?: CustomError
}

export const auth = createModel<RootModel>()({
  state: {
    token: '',
    user: {}
  } as AuthState, // initial state
  reducers: {
    authSucceed(state, payload) {
      console.log(payload);
    },
    authFailed(state, { data, status }) {
      const authErr = apiErrorHandler({ status, ...data })
      console.log(authErr)
      state.error = { ...authErr }
    },
    clearError(state) {
      state.error = undefined
    },
    logOut(state) {
      state.token = ''
      state.user = undefined
      state.error = undefined
    }
  },
  effects: (dispatch) => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async login(request: LoginRequest) {
      await fetch({
        url: "auth/login",
        method: "POST",
        data: request
      })
        .then(({ data }) => dispatch.auth.authSucceed(data))
        .catch((reason) => dispatch.auth.authFailed(reason))
    },
    async verify() {
      // Verify login token every time page reload
      await fetch({
        url: "auth/verify",
        method: "POST",
      })
        .then(({ data }) => dispatch.auth.authSucceed(data))
        .catch(({ response }) => dispatch.auth.authFailed(response))
    }
  }),
});
