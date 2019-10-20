import React from 'react';
import { Alert, Spinner } from 'reactstrap';

export const BoxLoading = props => {
  const { message } = props;
  return (
    <div className="mt-5">
      <Spinner color="dark" />
      <span>{` ${message}`}</span>
    </div>
  );
};

export const AlertMessage = props => {
  const { color, message } = props;
  return <Alert color={color}>{message}</Alert>;
};
