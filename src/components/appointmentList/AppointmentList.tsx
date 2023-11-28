import { useContext, useEffect, useState, useCallback } from "react";
// useEffect - хук для запросов на сервер, запросы на сервер по правилам ректа можно делать только внутри хука useEffect, если мы используем функциональные компоненты

import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import CancelModal from "../modal/CancelModal";

function AppointmentList() {
  // const { allAppointments, getAppointments } = useContext(AppointmentContext);
  const {
    activeAppointments,
    getActiveAppointments,
    appointmentLoadingStatus,
  } = useContext(AppointmentContext);

  const [isOpen, setIsopen] = useState(false);
  // isOpen - стейт, setIsopen - функция, которая будет изменять это состояние
  const [selectedId, selectId] = useState(0); //эта функция будет срабатывать, когда открывается модальное окно

  useEffect(() => {
    // как только поменяется state в allAppointments придет массив типа IAppointment[]
    // getAppointments();
    getActiveAppointments();
  }, []);

  const handleOpenModal = useCallback((id: number) => {
    // кэширование функции
    setIsopen(true);
    selectId(id);
  }, []);

  console.log(appointmentLoadingStatus);
  if (appointmentLoadingStatus === "loading") {
    return <Spinner />;
  } else if (appointmentLoadingStatus === "error") {
    return (
      <>
        <Error />;
        <button className="schedule__reload" onClick={getActiveAppointments}>
          Try to reload
        </button>
      </>
    );
  }
  console.log("render list");
  return (
    <>
      {activeAppointments.map((item) => {
        return (
          <AppointmentItem
            {...item}
            key={item.id}
            openModal={handleOpenModal}
            // openModal={setIsopen}
            // selectId={() => selectId(item.id)}
          />
        );
      })}
      {/* показывает модальное окно, если isOpen */}
      {/* {isOpen ? ( */}
      <CancelModal
        handleClose={setIsopen}
        selectedId={selectedId}
        isOpen={isOpen}
      />
      {/* ) : null} */}

      {/* {allAppointments[0] ? allAppointments[0].name : null} */}
      {/* <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem />
      <AppointmentItem /> */}
    </>
  );
}

export default AppointmentList;
