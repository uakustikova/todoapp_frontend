<template>
  <div class="todo-item" @click="done">
    <span :class="{ done: todo.done_date }">{{ todo.name }}</span>
    <span>{{ todo.done_date }}</span>
    <Checkmark :done="todo.done_date != null" />
  </div>
</template>

<script>
import Checkmark from "@/components/icons/Checkmark.vue";

export default {
  name: "Todo",
  components: { Checkmark },
  props: {
    todo: Object,
  },
  methods: {
    done() {
      if (this.todo.done_date) {
        this.$emit("undone", this.todo.id);
      } else {
        this.$emit("done", this.todo.id);
      }
    },
  },
};
</script>

<style scoped>
.todo-item {
  width: 400px;
  padding: 10px 20px;
  margin: 10px;

  border: 1px solid grey;
  border-radius: 20px;

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  background-color: #282828;
  transition: background-color 0.2s;
}

.todo-item:hover {
  background-color: #2c3e50;
}

.done {
  text-decoration: line-through;
  color: #5c5c5c;
}
</style>
