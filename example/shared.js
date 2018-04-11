import { render } from 'inferno';
import { Provider, Subscribe, Container } from '../lib/unstated';

class CounterContainer extends Container {
  state = { count: 0 };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

const sharedCounterContainer = new CounterContainer();

function Counter() {
  return (
    <Subscribe to={[sharedCounterContainer]}>
      {counter => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span>{counter.state.count}</span>
          <button onClick={() => sharedCounterContainer.increment()}>+</button>
        </div>
      )}
    </Subscribe>
  );
}

render(
  <Provider>
    <Counter />
  </Provider>,
  window.shared
);
