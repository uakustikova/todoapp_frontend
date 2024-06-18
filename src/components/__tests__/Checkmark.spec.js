import Checkmark from "@/components/icons/Checkmark.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
describe("Checkmark.vue Test", () => {
  it("shows classes of checkmark", () => {
    const wrapper = mount(Checkmark, {
      propsData: {
        done: true,
      },
    });
    const divs = wrapper.findAll("div");
    expect(divs[2].classes()).toContain("checkmark_stem");
    expect(divs[3].classes()).toContain("checkmark_kick");
  });

  it("doesn't show classes of checkmark", () => {
    const wrapper = mount(Checkmark, {
      propsData: {
        done: false,
      },
    });
    const divs = wrapper.findAll("div");
    expect(divs.length).toBe(2);
  });
});
