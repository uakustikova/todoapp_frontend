import Login from "@/components/authentication/Login.vue";
import { shallowMount } from "@vue/test-utils";
import { vi } from "vitest";
import { useRouter } from "vue-router";
import { authLogin } from "../../api";

// Mock useRouter and authLogin for testing
vi.mock("vue-router");
vi.mock("../../api");

describe("Login.vue", () => {
  let router, authLoginMock;

  beforeEach(() => {
    router = { push: vi.fn() };
    useRouter.mockReturnValue(router);
    authLoginMock = vi.fn();
    authLogin.mockResolvedValue({}); // Mock successful login
  });

  it("renders the login form with username and password fields", () => {
    const wrapper = shallowMount(Login);
    const usernameInput = wrapper.find("input[type='text']");
    const passwordInput = wrapper.find("input[type='password']");
    const submitButton = wrapper.find("button[type='submit']");

    expect(usernameInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
    expect(submitButton.exists()).toBe(true);
  });

  it("redirects to todos page on successful login", async () => {
    const wrapper = shallowMount(Login);
    await wrapper.find("form").trigger("submit.prevent");

    expect(router.push).toHaveBeenCalledWith("/todos");
  });
});
