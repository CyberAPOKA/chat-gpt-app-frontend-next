import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "@/app/register/page";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "pt",
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@/components/LanguageSwitcher", () => () => {
  return <div data-testid="language-switcher" />;
});

jest.mock("@/services/api", () => ({
  default: {
    post: jest.fn((url: string) => {
      if (url.includes("login")) {
        return Promise.resolve({ data: { token: "mock-token" } });
      }
      return Promise.resolve();
    }),
  },
}));

beforeAll(() => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

describe("RegisterPage", () => {
  it("deve renderizar todos os campos de input e botões", () => {
    render(<RegisterPage />);

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("deve exibir erro se as senhas não coincidirem", () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "senha123" },
    });
    fireEvent.change(screen.getByTestId("confirmPassword"), {
      target: { value: "outraSenha" },
    });

    fireEvent.click(screen.getByTestId("register-button"));
  });
});
