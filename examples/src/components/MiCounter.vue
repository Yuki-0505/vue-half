<script setup lang="ts">
import { ref } from 'vue'
import Counter, { Expose } from './Counter'

const counterRef = ref<Expose | null>(null)
const update = (value: number) => {
  console.log('[update]', value)
  if (value >= 5) {
    counterRef.value?.toggle(false)
  }
}
</script>

<template>
  <Counter ref="counterRef" msg="hello" @update="update">
    <template #default="count">count is {{ count }}</template>
  </Counter>
</template>
