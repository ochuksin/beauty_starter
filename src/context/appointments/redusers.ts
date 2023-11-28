import { AppointmentAction, ActionsTypes } from "./actions";
import {
  IAppointment,
  ActiveAppointment,
} from "../../shared/interfaces/appointment.interface";
import { loadingStatusOptions } from "../../hooks/http.hook";

export interface IAppointmentState {
  allAppointments: IAppointment[] | [];
  activeAppointments: ActiveAppointment[] | [];
  // массивы IAppointment[],  ActiveAppointment[] не просто IAppointment и ActiveAppointment  и пустые массивы [], иначе будет ошибка
  appointmentLoadingStatus: loadingStatusOptions;
}

export default function reduser(
  state: IAppointmentState,
  action: AppointmentAction
): IAppointmentState {
  switch (action.type) {
    case ActionsTypes.SET_ALL_APPOINTMENTS:
      return {
        ...state,
        allAppointments: action.payload,
        appointmentLoadingStatus: "idle",
      };
    case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
      return {
        ...state,
        activeAppointments: action.payload,
        appointmentLoadingStatus: "idle",
      };
    case ActionsTypes.FETCHING_APPOINTMENTS:
      return { ...state, appointmentLoadingStatus: "loading" };
    case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
      return { ...state, appointmentLoadingStatus: "error" };

    default:
      return state;
  }
}
