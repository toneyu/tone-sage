import { postLogin } from 'utils/api';
import { login } from 'store/actions/auth';
import { call, takeEvery } from 'typed-redux-saga';
import { getType } from 'typesafe-actions';

function* loginSaga({ payload }) {
  yield* call(postLogin, username, password);
}

export default function* () {
  yield* takeEvery(getType(login), loginSaga);
}
