import { useEffect, useState, memo } from "react";
import "./appointmentItem.scss";
import dayjs from "dayjs";
// dayjs - библиотека
import { Optional } from "utility-types";
// npm install utility-types --save

// import { ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import { IAppointment } from "../../shared/interfaces/appointment.interface";
import { type } from "os";

// type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>; // - это без библиотеки, самостоятельно вытаскиваем тип
// Pick<Partial<T>, K> - тип котроый состоит из всех ключей, которые быи в T, Omit удаляет из T все что лежитв ключах K

type AppointmentProps = Optional<IAppointment, "canceled"> & {
  openModal: (state: number) => void;
  // openModal: (state: boolean) => void;
  // selectId: () => void;
};

// function AppointmentItem({
const AppointmentItem = memo(
  ({
    id,
    name,
    date,
    service,
    phone,
    canceled,
    openModal,
  }: // selectId,
  AppointmentProps) => {
    // dayjs - библиотека
    const [timeLeft, changeTimeLeft] = useState<string | null>(null);
    // timeLeft - сколько осталось времени
    // если date изменился в компоненте, то будет вызываться, запускаться useEffect
    useEffect(() => {
      // date - будующая дата
      // diff(undefined, "day") текущаяя дата, "day" - чтобы выводилось в днях, можно diff(), но тогда в миллисекундах бдут?
      // console.log(dayjs(date).diff(undefined, "h"));
      // console.log(dayjs(date).diff(undefined, "m") % 60);
      changeTimeLeft(
        `${dayjs(date).diff(undefined, "h")}:${
          dayjs(date).diff(undefined, "m") % 60
        }`
      );
      const intervalId = setInterval(() => {
        changeTimeLeft(
          `${dayjs(date).diff(undefined, "h")}:${
            dayjs(date).diff(undefined, "m") % 60
          }`
        );
      }, 60000);

      return () => {
        // убирает таймер intervalId - setInterval, когда компонент уже не нужен
        clearInterval(intervalId);
      };
    }, [date]);
    const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm");
    console.log("render item");

    return (
      <div className="appointment">
        <div className="appointment__info">
          <span className="appointment__date">Date: {formattedDate}</span>
          <span className="appointment__name">Name: {name}</span>
          <span className="appointment__service">Service: {service}</span>
          <span className="appointment__phone">Phone: {phone}</span>
        </div>

        {!canceled ? (
          <>
            <div className="appointment__time">
              <span>Time left:</span>
              <span className="appointment__timer">{timeLeft}</span>
              {/* <span className="appointment__timer">HH:mm</span> */}
            </div>
            <button
              className="appointment__cancel"
              onClick={() => {
                openModal(id);
                // openModal(true);
                // selectId();
              }}
            >
              Cancel
            </button>
          </>
        ) : null}

        {canceled ? (
          <div className="appointment__canceled">Canceled</div>
        ) : null}
      </div>
    );
  }
);

export default AppointmentItem;

//TIME 7:30
