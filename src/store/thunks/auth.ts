import { TypedThunkAction } from '@types';

export const thunkSendMessage = (message: string): TypedThunkAction => async (
  dispatch,
  getState
) => {
  const asyncResp = await exampleAPI();
  getState();
  dispatch(
    sendMessage({
      message,
      user: asyncResp,
      timestamp: new Date().getTime(),
    })
  );
};
