import { defineComponent, SetupContext } from 'vue'
import { useRender, ClassComponent } from 'vue-half'
import type { VNode } from 'vue'

export type Attrs = {
  msg: string,
}
export type Emit = {
  'update': (value: number) => void
}
export type Slots = {
  default: (count: number) => VNode[]
}
export type Expose = {
  toggle(value?: boolean): void
}

export class Counter extends ClassComponent<Attrs, Slots, Emit, Expose> {
  // data
  public count = 0
  public visible = true
  constructor(props: Attrs, ctx: SetupContext<Emit>) {
    super(props, ctx)
    // expose
    this.expose({
      toggle: (value: boolean = !this.visible) => { this.visible = value }
    })
  }
  // computed
  get double() {
    return this.count * 2
  }
  get message() {
    return `${this.attrs.msg}, double is ${this.double}`
  }
  // watch
  watch(message = this.message) {
    console.log('[watch]', message)
  }
  // methods
  increase() {
    this.emit('update', this.count)
    this.count++
  }
  // render
  render() {
    this.watch()
    return (
      <button type="button" onClick={this.increase} disabled={!this.visible}>
        {this.slots.default(this.count)}
      </button>
    )
  }
}
export default defineComponent(useRender(Counter))
