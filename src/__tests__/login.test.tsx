import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import "@testing-library/jest-dom";

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

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("LoginPage", () => {
  it("deve renderizar os campos e botões", () => {
    render(<LoginPage />);
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
  });

  it("deve simular erro de login inválido", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "email@teste.com" },
    });

    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "senha123" },
    });

    fireEvent.click(screen.getByTestId("login-button"));
  });
});
