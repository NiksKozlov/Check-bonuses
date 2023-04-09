import {httpCheckBonusesService} from './http.service';

export const checkBonusesService = {
  checkBonuses: (AccessToken: string) => {
    return httpCheckBonusesService.get<CheckBonusesResponseType>(`api/v3/ibonus/generalinfo/${AccessToken}`, {});
  }
}

type CheckBonusesResponseType = {
  resultOperation: {
    status: number,
    message: string,
    messageDev: string,
    codeResult: number,
    duration: number,
    idLog: string
  },
  data: {
    typeBonusName: string,
    currentQuantity: number,
    forBurningQuantity: number,
    dateBurning: string
  }
}