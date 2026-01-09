<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'remove', 'toggle'])
</script>

<template>
  <div class="flex items-center gap-2">
    <p
      class="flex-1 py-1"
      :class="{ 'line-through': task.complete }"
      @click="$emit('edit', task.name)"
    >
      {{ task.name }}
    </p>
    <v-btn
      :icon="task.complete ? 'mdi-refresh' : 'mdi-check'"
      :title="task.complete ? 'Reset' : 'Complete'"
      density="comfortable"
      variant="text"
      @click="$emit('toggle', task.name)"
    />
    <v-btn
      icon="mdi-close"
      title="Remove"
      density="comfortable"
      variant="text"
      @click="$emit('remove', task.name)"
    />
  </div>
</template>
