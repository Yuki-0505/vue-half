import { defineComponent } from 'vue'
import { useRender, ClassComponent } from 'vue-half'
import Counter, { Expose } from './Counter'

class MiCounter extends ClassComponent {
  counterRef: (Expose & Element) | null = null
  update(value: number) {
    if (value >= 5) {
      this.counterRef?.toggle(false)
    }
  }
  render() {
    return (
      <Counter ref={r => this.counterRef = r as any} msg="hello" onUpdate={this.update}>
        {{ default: (value: number) => `count is ${value}` }}
      </Counter >
    )
  }
}

export default defineComponent(useRender(MiCounter))
