import { createTodo, doneTodo, readTodos, undoneTodo } from "@/api";
import TodoInput from "@/components/TodoInput.vue";
import TodoList from "@/components/TodoList.vue";
import { mount } from "@vue/test-utils";
import posthog from "posthog-js";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("posthog-js", () => ({
  default: {
    isFeatureEnabled: vi.fn().mockReturnValue(false),
    onFeatureFlags: vi.fn((cb) => cb()),
  },
}));

vi.mock("@/api", () => ({
  readTodos: vi.fn(),
  createTodo: vi.fn(),
  doneTodo: vi.fn(),
  undoneTodo: vi.fn(),
}));

describe("TodoList.vue", () => {
  let wrapper;

  beforeEach(async () => {
    vi.clearAllMocks(); // Clear mocks between tests
    // Set up or reset mocks with specific return values
    posthog.isFeatureEnabled.mockReturnValue(false);
    posthog.onFeatureFlags.mockReturnValue((cb) => cb());
    readTodos.mockResolvedValue([
      { id: 1, user_id: 1, name: "Test Todo 1", done_date: "2022-01-01" },
      { id: 2, user_id: 1, name: "Test Todo 2", done_date: "2023-01-01" },
      { id: 3, user_id: 1, name: "Test Todo 3", done_date: null },
    ]);
    createTodo.mockResolvedValue({
      id: 3,
      user_id: 1,
      name: "Buy milk",
      done_date: null,
    });
    doneTodo.mockResolvedValue({
      id: 1,
      user_id: 1,
      name: "Test Todo 1",
      done_date: "2023-01-01",
      completed: true,
    });
    undoneTodo.mockResolvedValue({
      id: 1,
      user_id: 1,
      name: "Test Todo 1",
      done_date: "2023-01-01",
      completed: false,
    });

    wrapper = await mount(TodoList);
  });

  it("emits new todo correctly", async () => {
    const inputComponent = wrapper.findComponent(TodoInput);
    await inputComponent.vm.$emit("new-todo", "Buy milk");
    expect(createTodo).toHaveBeenCalledWith("Buy milk");
  });

  it("updates todos when done/undone", async () => {
    await wrapper.vm.done(1);
    expect(doneTodo).toHaveBeenCalledWith(1);

    await wrapper.vm.undone(1);
    expect(undoneTodo).toHaveBeenCalledWith(1);
  });
});
