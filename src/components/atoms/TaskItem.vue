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
  <div class="task-item">
    <p
      class="task-item__title"
      :class="{ complete: task.complete }"
      @click="$emit('edit', task.name)"
    >
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

<style scoped>
.task-item {
  align-items: center;
  column-gap: 0.5rem;
  display: flex;
}
.task-item__title {
  flex: 1;
}
.task-item__title.complete {
  text-decoration: line-through;
}
</style>
