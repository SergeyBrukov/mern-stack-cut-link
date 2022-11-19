import { JsxElement } from 'typescript';

export interface IRouter {
  readonly path: string;
  element: JSX.Element;
}
