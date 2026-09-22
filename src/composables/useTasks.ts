import { ref } from 'vue'

import { useStorage } from '@/composables/useStorage'

const STORAGE_KEY = 'todo'

export interface Task {
  name: string
  completed: boolean
}

export interface TaskGroup {
  name: string
  tasks: Task[]
}

const list = ref<TaskGroup[]>([])
const storage = useStorage()

export const useTasks = () => {
  const load = () => {
    const tasks = storage.get(STORAGE_KEY)

    list.value = tasks.length ? tasks : [{ name: 'Todo', tasks: [] }]
  }
  const save = () => {
    storage.set(STORAGE_KEY, list.value)
  }

  const addGroup = (name: string) => {
    list.value.push({ name, tasks: [] })

    save()
  }
  const removeGroup = (groupIndex: number) => {
    list.value.splice(groupIndex, 1)

    save()
  }
  const clearGroup = (groupIndex: number) => {
    list.value[groupIndex].tasks = []

    save()
  }

  const add = (groupIndex: number, task: string) => {
    list.value[groupIndex].tasks.push({ name: task, completed: false })

    save()
  }
  const update = (groupIndex: number, taskIndex: number, name: string) => {
    list.value[groupIndex].tasks[taskIndex].name = name

    save()
  }
  const remove = (groupIndex: number, taskIndex: number) => {
    list.value[groupIndex].tasks.splice(taskIndex, 1)

    save()
  }
  const toggle = (groupIndex: number, taskIndex: number) => {
    list.value[groupIndex].tasks[taskIndex].completed =
      !list.value[groupIndex].tasks[taskIndex].completed

    save()
  }

  return {
    list,
    load,
    addGroup,
    removeGroup,
    clearGroup,
    add,
    update,
    remove,
    toggle,
  }
}
