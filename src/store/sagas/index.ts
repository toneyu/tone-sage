import { all } from 'typed-redux-saga';
import auth from 'store/sagas/auth';

export default function* rootSaga() {
  yield* all([auth()]);
}
