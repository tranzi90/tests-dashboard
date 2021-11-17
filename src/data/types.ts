import {DataServiceErrors} from "./DataService";

export enum Type {
  CLASSIC = "CLASSIC",
  SERVER_SIDE = "SERVER_SIDE",
  MVT = "MVT"
}

export enum Status {
  DRAFT = "DRAFT",
  ONLINE = "ONLINE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface Site {
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}

export interface NormalizedTest {
  id: number,
  name: string,
  type: Type,
  status: Status,
  siteId: number
  site: string,
  color?: string
}

export type sitesMap = Map<number, string>;

export interface Data {
  tests: NormalizedTest[],
  error: DataServiceErrors
}

