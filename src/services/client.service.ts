import {httpAccessTokenService} from './http.service';

export const clientService = {
  createAccessToken: ({
                        idClient,
                        accessToken,
                        paramName,
                        paramValue,
                        latitude,
                        longitude,
                        sourceQuery
                      }: CreateAccessTokenParamsType) => {
    return httpAccessTokenService.post<CreateAccessTokenResponseType>(`api/v3/clients/accesstoken`, {
      idClient,
      accessToken,
      paramName,
      paramValue,
      latitude,
      longitude,
      sourceQuery
    });
  }
}

type CreateAccessTokenParamsType = {
  idClient?: string,
  accessToken?: string,
  paramName?: string,
  paramValue?: string,
  latitude?: number,
  longitude?: number,
  sourceQuery?: number
}

type CreateAccessTokenResponseType = {
  result: {
    status: number,
    message: string,
    messageDev: string,
    codeResult: number,
    duration: number,
    idLog: string
  },
  accessToken: string
}