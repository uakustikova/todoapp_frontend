import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TodoInput from "./../TodoInput.vue";

describe("TodoInput.vue Test", () => {
  it("renders correctly", () => {
    const wrapper = mount(TodoInput);
    expect(wrapper.find(".todo-input").exists()).toBe(true);
  });

  it("updates value with v-model", async () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find(".todo-input");

    await input.setValue("New Todo");
    expect(wrapper.vm.value).toBe("New Todo");
  });

  it('emits "new-todo" event with the correct value on Enter key', async () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find(".todo-input");

    await input.setValue("New Todo");
    await input.trigger("keyup.enter");

    expect(wrapper.emitted()["new-todo"]).toBeTruthy();
    expect(wrapper.emitted()["new-todo"][0]).toEqual(["New Todo"]);
    expect(wrapper.vm.value).toBe(null);
  });
});
