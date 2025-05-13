//import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ stories: [{ title: "Real Stories" }] }),
  })
);
