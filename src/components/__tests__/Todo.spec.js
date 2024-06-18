import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Todo from "../Todo.vue";

describe("Todo.vue Test", () => {
  it("renders text of TODO", () => {
    // render the component
    const wrapper = mount(Todo, {
      propsData: {
        todo: {
          name: "Wash dishes",
        },
      },
    });

    // check that the title is rendered
    expect(wrapper.text()).toMatch("Wash dishes");
  });

  it("renders text of TODO", () => {
    // render the component
    const wrapper = mount(Todo, {
      propsData: {
        todo: {
          name: "Wash dishes",
          done_date: "2022-01-01",
        },
      },
    });

    // check that the title is rendered
    expect(wrapper.find("span").classes()).toContain("done");
  });
});
