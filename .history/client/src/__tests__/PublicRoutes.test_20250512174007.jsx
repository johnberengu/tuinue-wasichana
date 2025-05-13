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

const renderWithRouter = (initialEntries) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <PublicRoutes />
    </MemoryRouter>
  );
};

test("renders HomePage at /", () => {
  renderWithRouter(["/"]);
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});

test("renders CharityDashboard at /charitydashboard", () => {
  renderWithRouter(["/charitydashboard"]);
  expect(screen.getByText(/charity dashboard/i)).toBeInTheDocument();
});

test("renders AboutPage at /about", () => {
  renderWithRouter(["/about"]);
  expect(screen.getByText(/about page/i)).toBeInTheDocument();
});

test("renders CharityListingPage at /charities", () => {
  renderWithRouter(["/charities"]);
  expect(screen.getByText(/charity listing page/i)).toBeInTheDocument();
});

test("renders CharityDetails at /charity-details/:id/", () => {
  renderWithRouter(["/charity-details/1/"]);
  expect(screen.getByText(/charity details/i)).toBeInTheDocument();
});

test("renders DonationPage at /donate", () => {
  renderWithRouter(["/donate"]);
  expect(screen.getByText(/donation page/i)).toBeInTheDocument();
});

test("renders LoginForm at /login", () => {
  renderWithRouter(["/login"]);
  expect(screen.getByText(/login form/i)).toBeInTheDocument();
});

test("renders RegistrationChoice at /register", () => {
  renderWithRouter(["/register"]);
  expect(screen.getByText(/registration choice/i)).toBeInTheDocument();
});

test("renders CharityRegistration at /register/charity/:userType", () => {
  renderWithRouter(["/register/charity/testUserType"]);
  expect(screen.getByText(/charity registration/i)).toBeInTheDocument();
});

test("renders DonorRegistration at /register/donor/:userType", () => {
  renderWithRouter(["/register/donor/testUserType"]);
  expect(screen.getByText(/donor registration/i)).toBeInTheDocument();
});

test("renders ResetPassword at /reset-password", () => {
  renderWithRouter(["/reset-password"]);
  expect(screen.getByText(/reset password/i)).toBeInTheDocument();
});

test("renders StoryPage at /charities/:id/stories", () => {
  renderWithRouter(["/charities/1/stories"]);
  expect(screen.getByText(/story page/i)).toBeInTheDocument();
});
