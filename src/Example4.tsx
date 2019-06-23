import React from 'react';
import { connect } from 'react-redux';

const Count = (props: any) => (
  <div>
    The count is {props.count}
    <button onClick={props.increment}>increment</button>
    <button onClick={props.incrementAsync}>incrementAsync</button>
  </div>
)

const mapState = (state: any) => ({
  count: state.count
})

const mapDispatch = ({ count: { increment, incrementAsync }}:any) => ({
  increment: () => increment(1),
  incrementAsync: () => incrementAsync(1)
})

export default connect(mapState, mapDispatch)(Count);