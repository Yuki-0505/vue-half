import { useStore } from './useStore'
import type { EmitsOptions, SetupContext} from 'vue-demi'

export type EmitFn = (...args: any[]) => any
export type Emits = Record<string | symbol, EmitFn | null> | string[]

export type UnEmitArray<T> =
  T extends [infer F, infer N]
  ? { [key in on<F>]: EmitFn } & UnEmitArray<N>
  : {}

export type UnEmitObject<T> = {
  [key in on<keyof T>]: un<key> extends keyof T ? T[un<key>] : never
}

export type onMethod<T extends EmitsOptions> =
  T extends string[]
  ? UnEmitArray<T>
  : UnEmitObject<T>

export type on<T> = T extends string ? `on${Capitalize<T>}` : never
export type un<T> = T extends `on${infer K}` ? Uncapitalize<K> : never

export type MiClassComponent<A, S, E, X> = {
  new(props: A, ctx: SetupContext<E>): {
    render(): JSX.Element
  }
}

export function useRender<
  A, S, E extends EmitsOptions, X
>(clazz: MiClassComponent<A, S, E, X>) {
  return (props: Readonly<A & Partial<onMethod<E>>>, ctx: SetupContext) =>
    useStore(new clazz(props, ctx as any)).render
}