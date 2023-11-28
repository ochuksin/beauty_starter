import React, { createContext, useReducer, useEffect } from "react";
import reduser, { IAppointmentState } from "./redusers";
import useAppointmentService from "../../services/AppointmentService";

import { ActionsTypes } from "./actions";

const initialState: IAppointmentState = {
  allAppointments: [],
  activeAppointments: [],
  appointmentLoadingStatus: "idle",
};
//
//

interface ProviderProps {
  children: React.ReactNode;
}

interface appointmentContextValue extends IAppointmentState {
  // к полям в IInitialState добавляем один метод
  getAppointments: () => void;
  getActiveAppointments: () => void;
  // void - ничего не возвращаем
}
export const AppointmentContext = createContext<appointmentContextValue>({
  // задаются начальные значения, они будут перезаписаны в компоненте AppointmentContextProvider
  allAppointments: initialState.allAppointments,
  activeAppointments: initialState.activeAppointments,
  appointmentLoadingStatus: initialState.appointmentLoadingStatus,
  getAppointments: () => {},
  getActiveAppointments: () => {},
});

// компонент провайдер нужен дя того, чтоб ыраспространять контекст на все компоненты, которые находятся ниже
// будет принимать в себя другие компоненты, пропускать через себя
const AppointmentContextProvider = ({ children }: ProviderProps) => {
  //будет использоваться хук useReduser, который будет создавать стейт который будет контролироваться функцией редюсером и будет передаваться вниз по компоненту contentProvider и оборачиваться и прокидываться ниже, а изменения будут контролироваться на уровне провайдера AppointmentContextProvider при помощи редюсера
  // хук useReducer() отвечает за формирование глобального стейта
  const [state, dispatch] = useReducer(reduser, initialState); // const [state, dispatch] - кортеж
  const {
    loadingStatus,
    getAllAppointments,
    getAllActiveAppointments,
    cancelOneAppointment,
  } = useAppointmentService();

  const value: appointmentContextValue = {
    // то, что будте храниться в стейте
    allAppointments: state.allAppointments,
    activeAppointments: state.activeAppointments,
    appointmentLoadingStatus: loadingStatus,
    // getAppointments - получает значения для стейта
    // dispatch запускается, принимает внутри себя какой-то экшн {}, и через функцию reduser идет обновление state
    // метод внутри контекста, будет внутри всех контекстных компонентов
    getAppointments: () => {
      // запрос на сервер, в случае успешного запроса - получает данные и эти данные будут диспетчится во внутрь стейта
      // это функционал будет вызывать функцию редюсер редюсер будет определять action type, и как paeload запишет data, data и пойдет в наш state
      getAllAppointments().then((data) =>
        // метод getAllAppointments получает данные, все записи, и после того, как данные были получены записывает данные во внутрь state
        // dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: [] }) // пустой массив[], потому что мы пока ничего не получили
        dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data })
      );
    },

    getActiveAppointments: () => {
      getAllActiveAppointments().then((data) => {
        dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data });
      });
    },
  };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;
