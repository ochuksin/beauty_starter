import { useState, useLayoutEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}
function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  // wrapperElement.setAttribute("class", "modal");
  document.body.append(wrapperElement);

  return wrapperElement;
}

//Порталы - это механизм, который позволяет брать какой-то дочерний элемент, компонент и и рендерить его вне его родительского компонента
function Portal({ children, wrapperId = "portal-wrapper" }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  ); //null потому что, когда компонент начинает работвть, там пока еще ничего не лежит
  // useLayoutEffect - хук, выполняется до того, как браузер перерисовал ДОМ структуру
  useLayoutEffect(() => {
    // мы должны выбрать уникалный элемент по wrapperId, если элемент не существует, то мы должные его созать и поместить на страницу и потом использовать для того, чтобы помещать туда children
    let element = document.getElementById(wrapperId);
    let created = false;
    if (!element) {
      created = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      // удаляет элемент, после закрытия модального окна
      if (created) {
        element?.remove();
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
}

export default Portal;
