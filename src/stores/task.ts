import { ref } from 'vue'
import { defineStore } from 'pinia'

import storage from '../service/storage'

const STORAGE_KEY = 'todo'

interface Task {
  name: string
  complete: boolean
}

export const useTaskStore = defineStore('task', () => {
  const list = ref<Task[]>([])

  const load = () => {
    list.value = storage.get(STORAGE_KEY)
  }
  const save = () => {
    storage.set(STORAGE_KEY, list.value)
  }
  const clear = () => {
    list.value = []

    save()
  }

  const add = (task: string) => {
    list.value.push({ name: task, complete: false })

    save()
  }
  const update = (task: string, name: string) => {
    const index = list.value.findIndex((item) => item.name === task)

    list.value[index].name = name

    save()
  }
  const remove = (task: string) => {
    const index = list.value.findIndex((item) => item.name === task)

    list.value.splice(index, 1)

    save()
  }

  const toggle = (task: string) => {
    const index = list.value.findIndex((item) => item.name === task)

    list.value[index].complete = !list.value[index].complete

    save()
  }

  return { list, load, clear, add, update, remove, toggle }
})
