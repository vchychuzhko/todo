<script setup lang="ts">
import type { Task } from '@/stores/task.ts'

defineProps<{
  task: Task
}>()

defineEmits<{
  (e: 'edit'): void
  (e: 'remove'): void
  (e: 'toggle'): void
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <p class="flex-1 py-1" :class="{ 'line-through': task.completed }" @click="$emit('edit')">
      {{ task.name }}
    </p>
    <v-btn
      :icon="task.completed ? 'mdi-refresh' : 'mdi-check'"
      :title="task.completed ? 'Reset' : 'Complete'"
      density="comfortable"
      variant="plain"
      @click="$emit('toggle')"
    />
    <v-btn
      icon="mdi-close"
      title="Remove"
      density="comfortable"
      variant="plain"
      @click="$emit('remove')"
    />
  </div>
</template>
