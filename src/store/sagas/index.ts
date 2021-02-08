import { all } from 'typed-redux-saga';
import login from 'store/sagas/login';

export default function* rootSaga() {
  yield* all([login()]);
}
