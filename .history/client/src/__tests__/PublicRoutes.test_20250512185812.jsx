import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PublicRoutes from "../routes/PublicRoutes.jsx";
import HomePage from "../pages/public/HomePage";
import CharityDashboard from "../pages/charity/CharityDashboard";
import AboutPage from "../pages/public/AboutPage";
import CharityListingPage from "../pages/public/CharityListingPage";
import CharityDetails from "../pages/public/CharityDetails";
import DonationPage from "../pages/public/DonationPage";
import LoginForm from "../components/auth/LoginForm";
import RegistrationChoice from "../components/auth/RegistrationChoice";
import CharityRegistration from "../components/auth/CharityRegistration";
import DonorRegistration from "../components/auth/DonorRegistration";
import ResetPassword from "../components/auth/ResetPassword";
import StoryPage from "../pages/public/StoryPage";
import { test, expect } from "vitest";

import { Provider } from "react-redux";
import store from "../store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { vi } from "vitest";

const renderWithProviders = (initialEntries) => {
  return render(
    <Provider store={store}>
      <PayPalScriptProvider options={{ "client-id": "test" }}>
        <MemoryRouter initialEntries={initialEntries}>
          <PublicRoutes />
        </MemoryRouter>
      </PayPalScriptProvider>
    </Provider>
  );
};

// Mock fetch globally for API calls
beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes("/charities")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }
    if (url.includes("/stories")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    }
    return Promise.reject(new Error("Unknown URL"));
  });
});

test("renders HomePage at /", () => {
  renderWithProviders(["/"]);
  expect(
    screen.getByText(/Igniting Dreams, Forging Futures for Girls/i)
  ).toBeInTheDocument();
});

test("renders CharityDashboard at /charitydashboard", () => {
  renderWithProviders(["/charitydashboard"]);
  expect(
    screen.getByText((content, element) => content.match(/charity dashboard/i))
  ).toBeInTheDocument();
});

test("renders AboutPage at /about", () => {
  renderWithProviders(["/about"]);
  expect(
    screen.getByText((content, element) => content.match(/about page/i))
  ).toBeInTheDocument();
});

test("renders CharityListingPage at /charities", () => {
  renderWithProviders(["/charities"]);
  expect(
    screen.getByText((content, element) =>
      content.match(/charity listing page/i)
    )
  ).toBeInTheDocument();
});

test("renders CharityDetails at /charity-details/:id/", () => {
  renderWithProviders(["/charity-details/1/"]);
  expect(
    screen.getByText((content, element) => content.match(/charity details/i))
  ).toBeInTheDocument();
});

test("renders DonationPage at /donate", () => {
  renderWithProviders(["/donate"]);
  expect(
    screen.getByText((content, element) => content.match(/donation page/i))
  ).toBeInTheDocument();
});

test("renders LoginForm at /login", () => {
  renderWithProviders(["/login"]);
  expect(
    screen.getByText((content, element) => content.match(/login form/i))
  ).toBeInTheDocument();
});

test("renders RegistrationChoice at /register", () => {
  renderWithProviders(["/register"]);
  expect(
    screen.getByText((content, element) =>
      content.match(/registration choice/i)
    )
  ).toBeInTheDocument();
});

test("renders CharityRegistration at /register/charity/:userType", () => {
  renderWithProviders(["/register/charity/testUserType"]);
  expect(
    screen.getByText((content, element) =>
      content.match(/charity registration/i)
    )
  ).toBeInTheDocument();
});

test("renders DonorRegistration at /register/donor/:userType", () => {
  renderWithProviders(["/register/donor/testUserType"]);
  expect(
    screen.getByText((content, element) => content.match(/donor registration/i))
  ).toBeInTheDocument();
});

test("renders ResetPassword at /reset-password", () => {
  renderWithProviders(["/reset-password"]);
  expect(
    screen.getByText((content, element) => content.match(/reset password/i))
  ).toBeInTheDocument();
});

test("renders StoryPage at /charities/:id/stories", () => {
  renderWithProviders(["/charities/1/stories"]);
  expect(
    screen.getByText((content, element) => content.match(/story page/i))
  ).toBeInTheDocument();
});
