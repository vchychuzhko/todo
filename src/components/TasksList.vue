<script setup lang="ts">
import { type TaskGroup, useTaskStore } from '@/stores/task'
import TaskItem from '@/components/atoms/TaskItem.vue'
import AddTaskForm from '@/components/molecules/AddTaskForm.vue'

const taskStore = useTaskStore()

const props = defineProps<{
  group: TaskGroup
  groupIndex: number
}>()
const emit = defineEmits<{
  (e: 'remove'): void
}>()

const addTask = (task: string) => {
  taskStore.add(props.groupIndex, task)
}
const editTask = (taskIndex: number) => {
  const task = props.group.tasks[taskIndex].name
  const name = prompt(`Edit "${task}"`, task)

  if (name && name !== task) {
    taskStore.update(props.groupIndex, taskIndex, name)
  }
}
const removeTask = (taskIndex: number) => {
  const task = props.group.tasks[taskIndex].name
  const remove = confirm(`Remove "${task}"?`)

  if (remove) {
    taskStore.remove(props.groupIndex, taskIndex)
  }
}
const toggleTask = (taskIndex: number) => {
  taskStore.toggle(props.groupIndex, taskIndex)
}

const clearGroup = () => {
  if (!props.group.tasks.length) {
    return emit('remove')
  }

  const clear = confirm('Clear all tasks?')

  if (clear) {
    taskStore.clearGroup(props.groupIndex)
  }
}
</script>

<template>
  <section class="mx-auto max-w-120">
    <ol class="mb-4 list-decimal ps-5">
      <li class="pb-2" v-for="(task, index) in group.tasks" :key="task.name">
        <TaskItem
          :task="task"
          @edit="() => editTask(index)"
          @remove="() => removeTask(index)"
          @toggle="() => toggleTask(index)"
        />
      </li>
    </ol>
    <AddTaskForm @add="addTask" />
    <v-btn
      class="mt-2"
      :text="group.tasks.length ? 'Clear' : 'Remove'"
      variant="text"
      block
      @click="clearGroup"
    />
  </section>
</template>
