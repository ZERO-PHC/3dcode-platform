import { useContext } from 'react';

import CounterContext from '../contexts/CounterContext';

export default value => {
  const { dispatch } = useContext(CounterContext);

  const onInc = () => {
    dispatch({ type: 'INCREMENT', payload: value });
  };

  const onDec = () => {
    dispatch({ type: 'INCREMENT', payload: value });
  };

  return {
    onInc,
    onDec,
  };
};
