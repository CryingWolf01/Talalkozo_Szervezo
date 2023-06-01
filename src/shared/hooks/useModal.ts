import * as React from "react";

export type ModalActions =
  | "detail"
  | "create"
  | "modify"
  | "delete"
  | "activate"
  | "deactivate"
  | "block"
  | "unblock"
  | null;

export type ModalState<T> = {
  type: ModalActions;
  defaultValues?: T;
} | null;

export default function useModal<T>() {
  const [state, setState] = React.useState<ModalState<T>>(null);

  function modalClose() {
    setState(null);
  }

  function modalOpen(type: ModalActions, defaultValues?: T) {
    setState({
      type,
      defaultValues,
    });
  }

  return { state, modalOpen, modalClose };
}