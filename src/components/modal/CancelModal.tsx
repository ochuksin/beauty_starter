import Portal from "../portal/portal";
import { useRef, useEffect, useState, useContext } from "react";
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import useAppointmentService from "../../services/AppointmentService";
import { CSSTransition } from "react-transition-group";
//для CSSTransition нужно установить  npm i react-transition-group --save
// и npm i @types/react-transition-group --save
import "./modal.scss";

interface IModalProps {
  handleClose: (state: boolean) => void;
  selectedId: number;
  isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  //здесь nodeRef - ссылка на элемент использует хук useRef, лучше указывать как можно более специфичный таим, как здесь HTMLDivElement
  // const nodeRef = useRef<number | null>(null);
  //здесь nodeRef - мутабельное значение
  // useEffect(() => {
  //   if (nodeRef.current) {
  //     nodeRef.current = 5;
  //   }
  // });
  const cancelStatusRef = useRef<boolean | null>(null);
  const { getActiveAppointments } = useContext(AppointmentContext);

  const { cancelOneAppointment } = useAppointmentService();

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

  const handleCancelAppointment = (id: number) => {
    setBtnDisabled(true);
    cancelOneAppointment(id)
      .then(() => {
        console.log("done");
        setCancelStatus(true); //отменили запись клиента
        getActiveAppointments();
      })
      .catch(() => {
        console.log("error");
        setCancelStatus(false); //не удалось выполнить запрос, НЕ отменили запись клиента
        setBtnDisabled(false);
      });
  };
  const closeModal = () => {
    handleClose(false);
    if (cancelStatus || cancelStatusRef.current) {
      getActiveAppointments();
    }
  };
  const closeOnEscapeKey = (e: KeyboardEvent): void => {
    // в этом участке кода не нужно вытаскивать KeyboardEvent из реакт (не импортировать), здесь используется стандартный KeyboardEvent
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    cancelStatusRef.current = cancelStatus;
  }, [cancelStatus]);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      // нужно очистить хук, потому что элемент уберется из ДОМ
    };
  }, [handleClose]);

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={{ enter: 500, exit: 500 }}
        unmountOnExit
        classNames={"modal"}
        nodeRef={nodeRef}
      >
        <div className="modal" ref={nodeRef}>
          <div className="modal__body">
            <span className="modal__title">
              Are you sure you want to delete the appointment? #{selectedId}
            </span>
            <div className="modal__btns">
              <button
                className="modal__ok"
                disabled={btnDisabled}
                onClick={() => handleCancelAppointment(selectedId)}
              >
                Ok
              </button>
              <button className="modal__close" onClick={() => closeModal()}>
                Close
              </button>
            </div>
            <div className="modal__status">
              {cancelStatus === null
                ? ""
                : cancelStatus
                ? "Success"
                : "Error, please try again"}
            </div>
            {/* <div className="modal__status">Success</div> */}
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
}

export default CancelModal;
// ВРЕМЯ 23:00
