import "@testing-library/jest-dom";
import { vi } from "vitest";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ stories: [{ title: "Real Stories" }] }),
  })
);
