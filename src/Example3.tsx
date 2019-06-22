import React, { useState } from 'react';
import { createContainer } from 'unstated-next';
import { render } from 'react-dom';

const useCounter = (initialState = 0) => {
  let [count, setCount] = useState(initialState);
  let decrement = () => setCount(count - 1);
  let increment = () => setCount(count + 1);
  return { count, decrement, increment, setCount };
}

const useResettableCounter = () => {
  let counter = Counter.useContainer()
  let reset = () => counter.setCount(0)
  return { ...counter, reset }
}

let Counter = createContainer(useCounter);
let ResettableCounter = createContainer(useResettableCounter);

const CounterDisplay: React.FC = () => {
  let counter = Counter.useContainer();
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  )
}

const ResettableCounterDisplay: React.FC = () => {
  let counter = ResettableCounter.useContainer();
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.reset}>Reset</button>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Counter.Provider>
        <CounterDisplay />
        <Counter.Provider initialState={2}>
          <div>
            <div>
              <CounterDisplay />
            </div>
          </div>
        </Counter.Provider>
        <ResettableCounter.Provider>
          <ResettableCounterDisplay></ResettableCounterDisplay>
      </ResettableCounter.Provider>
      </Counter.Provider>
    </React.Fragment>
  )
}

export default App;