import { Coord } from "./weather.mode"

export class Bookmark {
  id: number = 0
  coord: Coord = {
    lon: 0,
    lat: 0
  }
  name: string = ''
  country: string = ''
}