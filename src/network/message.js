import {request} from "./request";

export function getMultidata() {
  return request({
    url: 'g2/getOnsInfo?name=disease_h5'
  })
}