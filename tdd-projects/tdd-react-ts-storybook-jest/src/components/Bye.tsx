import React from 'react';

type ByeProps = {
  name: string;
};

function Bye({ name }: ByeProps) {
  return <p>안녕히 가세요, {name}</p>;
}

export default Bye;
