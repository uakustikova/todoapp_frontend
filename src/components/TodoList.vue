<template>
  <ul>
    <li>
      <TodoInput @new-todo="post" />
    </li>

    <li
      v-if="featureFlags.sortTodos"
      v-for="date in Object.keys(todos).sort().reverse()"
    >
      <h3>{{ date == "null" ? "Tomorrow" : date }}</h3>
      <ul>
        <li v-for="(todo, i) in todos[date]">
          <Todo :todo="todo" @done="done" @undone="undone" />
        </li>
      </ul>
    </li>

    <li v-else v-for="(todo, i) in todos">
      <Todo :todo="todo" @done="done" @undone="undone" />
    </li>
  </ul>
</template>

<script>
import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";
import Todo from "@/components/Todo.vue";
import TodoInput from "@/components/TodoInput.vue";
import posthog from "posthog-js";

export default {
  name: "TodoList",
  components: { TodoInput, Todo },
  data() {
    return {
      todos: [],
      featureFlags: {
        sortTodos: false,
      },
    };
  },
  methods: {
    async getAll() {
      const todos = await readTodos();

      if (this.featureFlags.sortTodos) {
        this.sortTodos(todos);
      } else {
        this.todos = todos;
      }
    },
    sortTodos(todos) {
      const uniqueDates = [];
      for (let i = 0; i < todos.length; i++) {
        const currentTodo = todos[i];
        if (!uniqueDates.includes(currentTodo.done_date)) {
          uniqueDates.push(currentTodo.done_date);
        }
      }

      const datesWithTodos = {};
      for (let i = 0; i < uniqueDates.length; i++) {
        const currentDate = uniqueDates[i];
        datesWithTodos[currentDate] = todos.filter(
          (todo) => todo.done_date == currentDate
        );
      }
      this.todos = datesWithTodos;
    },
    async post(name) {
      var todo = await createTodo(name);
      if (this.featureFlags.sortTodos) {
        this.todos["null"].push(todo);
      } else {
        this.todos.push(todo);
      }
    },
    async done(id) {
      var todo = await doneTodo(id);
      this.update(id, todo);
    },
    async undone(id) {
      var todo = await undoneTodo(id);
      this.update(id, todo);
    },
    update(id, todo) {
      if (this.featureFlags.sortTodos) {
        Object.values(this.todos).forEach((todoList) => {
          todoList.forEach((value, i) => {
            if (value.id === id) {
              todoList[i] = todo;
            }
          });
        });
      } else {
        this.todos.forEach((value, i) => {
          if (value.id === id) {
            this.todos[i] = todo;
          }
        });
      }
    },
  },
  created() {
    posthog.onFeatureFlags(() => {
      this.featureFlags.sortTodos =
        posthog.isFeatureEnabled("sort-todos-by-date");
      this.getAll();
    });
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
