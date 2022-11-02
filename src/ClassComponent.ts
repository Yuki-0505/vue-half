import type { EmitsOptions, ObjectEmitsOptions, SetupContext, Slots } from 'vue-demi'
import type { UnionToIntersection } from 'vue-class-component/lib/util'

export type MiEmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: any[]) => void : {} extends Options ? (event: string, ...args: any[]) => void : UnionToIntersection<{
  [key in Event]: Options[key] extends (...args: infer Args) => any ? (event: key, ...args: Args) => void : (event: key, ...args: any[]) => void;
}[Event]>;

export abstract class ClassComponent<
  A extends object = object,
  S extends Slots = Slots,
  E extends EmitsOptions = EmitsOptions,
  X extends Record<string, any> = Record<string, any>,
  > {
  public attrs: A
  public slots: S
  public emit: MiEmitFn<E, keyof E>
  public expose: (exposed?: X) => void
  constructor(props: A, ctx: SetupContext<E>) {
    this.attrs = ctx.attrs as A
    this.slots = ctx.slots as S
    this.emit = ctx.emit
    this.expose = ctx.expose
  }
  abstract render(): JSX.Element
}
