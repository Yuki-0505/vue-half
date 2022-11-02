# VUE HALF

## Description

> global state manage store & vue class component

## Install

```bash
npm i vue-half
# or
yarn add vue-half
# or
pnpm i vue-half
```

## Example

- Counter

```tsx
/* Counter.tsx */
import { useRender, ClassComponent } from "vue-half";
import { defineComponent, SetupContext } from "vue";
import type { VNode } from "vue";

// type
export type Attrs = { msg: string };
export type Emit = { update: (value: number) => void };
export type Slots = { default: (count: number) => VNode[] };
export type Expose = { toggle(value?: boolean): void };

// class
export class Counter extends ClassComponent<Attrs, Slots, Emit, Expose> {
  // data
  public count = 0;
  public visible = true;
  constructor(props: Attrs, ctx: SetupContext<Emit>) {
    super(props, ctx);
    // expose
    this.expose({
      toggle: (value: boolean = !this.visible) => {
        this.visible = value;
      },
    });
  }
  // computed
  get double() {
    return this.count * 2;
  }
  get message() {
    // attrs
    return `${this.attrs.msg}, double is ${this.double}`;
  }
  // watch
  watch(message = this.message) {
    console.log('[watch]', message)
    return
  }
  // methods
  increase() {
    // emit
    this.emit("update", this.count);
    this.count++;
  }
  // render
  render() {
    this.watch()
    return (
      <button
        {/* attrs */}
        type="button"
        disabled={!this.visible}
        {/* emit */}
        onClick={this.increase}
      >
        {/* slots */this.slots.default(this.count)}
      </button>
    );
  }
}

export default defineComponent(useRender(Counter));
```

- App.vue

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ref } from "vue";
import Counter, { Expose } from "./Counter";

const counterRef = ref<Expose | null>(null);
const update = (value: number) => {
  if (value >= 5) {
    counterRef.value?.toggle(false);
  }
};
</script>

<template>
  <Counter ref="counterRef" msg="hello" @update="update">
    <template #default="count">count is {{ count }}</template>
  </Counter>
</template>
```
