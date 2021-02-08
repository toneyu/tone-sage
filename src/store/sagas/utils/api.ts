import { call, SagaGenerator, take } from 'typed-redux-saga';
import { getType } from 'typesafe-actions';
import { AxiosResponse } from 'axios';
import { CallEffect } from 'redux-saga/effects';
import { RootActionCreatorType } from '../../actions';

export function* takeAction<T extends RootActionCreatorType>(actionCreator: T) {
  return yield* take<ReturnType<T>>(getType(actionCreator));
}

// // eslint-disable-next-line require-yield
// export function* getApiResolve<
//   T extends keyof Endpoints,
//   U extends keyof Endpoints[T]
// >(

//   // @ts-ignore
// ): SagaGenerator<AxiosResponse<ResBody<T, U>>, CallEffect> {
//   return yield* call(api, route, method, body, query);
// }
