<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add', task: string): void
}>()

const task = ref('')

const addTask = () => {
  if (!task.value) return

  emit('add', task.value)

  task.value = ''
}
</script>

<template>
  <v-form @submit.prevent="addTask">
    <v-text-field
      v-model="task"
      label="Your task"
      hide-details
      append-icon="mdi-plus-circle-outline"
      @click:append="addTask"
    />
  </v-form>
</template>
