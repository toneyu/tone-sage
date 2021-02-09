import { takeEvery } from 'typed-redux-saga';
import { getType } from 'typesafe-actions';
import { login, logout } from 'store/actions/auth';
import history from 'store/history';

export default function* () {
  yield takeEvery(getType(login), () => {
    history.replace('/admin');
  });
  yield takeEvery(getType(logout), () => {
    history.replace('/login');
  });
}
