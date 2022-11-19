import { Dispatch, SetStateAction } from 'react';

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export type TLink = {
  clicks: number;
  code: string;
  date: string;
  from: string;
  to: string;
  _id: string;
};
