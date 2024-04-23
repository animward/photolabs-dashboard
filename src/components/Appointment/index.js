import React from 'react';
import './styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Empty from './Empty';
import Show from './Show';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      {mode === EMPTY && <Empty />}
      {mode === SHOW && <Show />}
    </article>
  );
};

export default Appointment;
