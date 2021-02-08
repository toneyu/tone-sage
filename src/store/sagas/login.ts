import { takeEvery } from 'typed-redux-saga';
import { getType } from 'typesafe-actions';
import { login } from 'store/actions/auth';
import history from 'store/history';

export default function* () {
  yield takeEvery(getType(login), () => {
    history.push('/admin');
  });
}
