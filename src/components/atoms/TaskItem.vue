<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'remove', 'complete'])
</script>

<template>
  <div class="flex items-center gap-2">
    <p class="flex-1" :class="{ 'line-through': task.complete }" @click="$emit('edit', task.name)">
      {{ task.name }}
    </p>
    <v-btn
      :icon="task.complete ? 'mdi-refresh' : 'mdi-check'"
      density="comfortable"
      @click="$emit('complete', task.name)"
    />
    <v-btn icon="mdi-close" density="comfortable" @click="$emit('remove', task.name)" />
  </div>
</template>
