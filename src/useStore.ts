import { UnwrapNestedRefs } from 'vue-demi'

let reactive: <T extends object>(target: T) => UnwrapNestedRefs<T>
export function track(options: {
  reactive: <T extends object>(target: T) => UnwrapNestedRefs<T>
}) {
  reactive = options.reactive
}

export function useStore<T extends object>(state: T) {
  return new Proxy(reactive(state), {
    get: (target, key, receiver) => {
      const property = Reflect.get(target, key)
      return typeof property === 'function'
        ? property.bind(receiver)
        : property
    }
  })
}
