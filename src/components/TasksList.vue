<script setup>
import { useTaskStore } from '@/stores/task.js'
import TaskItem from '@/components/atoms/TaskItem.vue'
import AddTaskForm from '@/components/molecules/AddTaskForm.vue'

const taskStore = useTaskStore()

taskStore.load()

const removeTask = (task) => {
  const remove = confirm(`Remove "${task}"?`)

  if (remove) {
    taskStore.remove(task)
  }
}
const completeTask = (task) => {
  taskStore.complete(task)
}
const clearTasks = () => {
  const remove = confirm('Remove all tasks?')

  if (remove) {
    taskStore.clear()
  }
}
</script>

<template>
  <section class="wrapper">
    <ol class="tasks-list">
      <li class="tasks-list__item" v-for="task in taskStore.list" :key="task.name">
        <TaskItem :task="task" @remove="removeTask" @complete="completeTask" />
      </li>
    </ol>
    <AddTaskForm />
    <v-btn class="tasks-list__clear" variant="text" block @click="clearTasks">Clear</v-btn>
  </section>
</template>

<style scoped>
.tasks-list {
  margin-bottom: 1rem;
  padding-inline-start: 1rem;
}
.tasks-list__item {
  padding-block: 0.5rem;
}
.tasks-list__clear {
  margin-top: 0.5rem;
}
</style>
