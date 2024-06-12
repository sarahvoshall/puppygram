import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal Component", () => {
  const mockImage = {
    breed: "golden retriever",
    image: "https://example.com/golden.jpg",
  };

  test("renders nothing when isOpen is false", () => {
    render(
      <Modal
        isOpen={false}
        onClose={() => {}}
        image={mockImage}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );

    const modalOverlay = screen.queryByTestId("modal-overlay");
    expect(modalOverlay).toBeNull();
  });

  test("renders modal content when isOpen is true", () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        image={mockImage}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );

    expect(screen.getByText(/Golden Retriever/i)).toBeInTheDocument();
    expect(screen.getByAltText(/puppy/i)).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={onCloseMock}
        image={mockImage}
        onNext={() => {}}
        onPrev={() => {}}
      />
    );

    const closeButton = screen.getByText(/×/i);
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test("calls onNext when next button is clicked", () => {
    const onNextMock = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        image={mockImage}
        onNext={onNextMock}
        onPrev={() => {}}
      />
    );

    const nextButton = screen.getByText(/›/i);
    fireEvent.click(nextButton);

    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  test("calls onPrev when prev button is clicked", () => {
    const onPrevMock = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        image={mockImage}
        onNext={() => {}}
        onPrev={onPrevMock}
      />
    );

    const prevButton = screen.getByText(/‹/i);
    fireEvent.click(prevButton);

    expect(onPrevMock).toHaveBeenCalledTimes(1);
  });

  test("handles keyboard events", () => {
    const onCloseMock = jest.fn();
    const onNextMock = jest.fn();
    const onPrevMock = jest.fn();

    render(
      <Modal
        isOpen={true}
        onClose={onCloseMock}
        image={mockImage}
        onNext={onNextMock}
        onPrev={onPrevMock}
      />
    );

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onNextMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onPrevMock).toHaveBeenCalledTimes(1);
  });
});
