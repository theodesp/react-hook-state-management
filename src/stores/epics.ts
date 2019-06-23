import { combineEpics, ofType, createEpicMiddleware } from 'redux-observable';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import {filter, mapTo, delay, map} from 'rxjs/operators';
import { Observable } from 'rxjs';

const epicMiddleware = createEpicMiddleware();

const PING = 'PING';
const PONG = 'PONG';

const pingEpic = (action$: Observable<any>) => action$.pipe(
  ofType(PING),
  mapTo({ type: PONG })
);

const pingEpicAsync = (action$: Observable<any>) => action$.pipe(
  ofType(PING),
  delay(1000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PONG })
);

const INCREMENT = 'INCREMENT';
const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';

const increment = () => ({ type: INCREMENT });
const incrementIfOdd = () => ({ type: INCREMENT_IF_ODD });

const incrementIfOddEpic = (action$: Observable<any>, state$: any) => action$.pipe(
  ofType(INCREMENT_IF_ODD),
  filter(() => state$.value.counter % 2 === 1),
  map(() => increment())
);

const counter = (state = 0, action: any) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;

    default:
      return state;
  }
};


export const rootEpic = combineEpics(
  pingEpic,
  pingEpicAsync
);

export const rootReducer = combineReducers({
});

export const store = createStore(
  rootReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);