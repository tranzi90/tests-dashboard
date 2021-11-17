import axios from "axios";
import api from "./api";
import {Data, NormalizedTest, Site, sitesMap, Test} from "./types";
import {normalizeTests} from "./utils";

export enum DataServiceErrors {
  INIT,
  NONE,
  ALL_SITES,
  ONE_SITE,
  ALL_TESTS,
  ONE_TEST
}

interface IDataService {
  getAllSites(): Promise<Map<number, string> | DataServiceErrors>,

  getOneSite(_id: number): Promise<Site | DataServiceErrors>,

  getAllTests(): Promise<Test[] | DataServiceErrors>,

  getOneTest(_id: number): Promise<Test | DataServiceErrors>,

  getAppInfo(): Promise<Data>
}

class DataService implements IDataService {
  async getAllSites(): Promise<Map<number, string> | DataServiceErrors> {
    try {
      const response = await axios.get(api.sites);
      const data = response.data as Site[];
      const newMap: sitesMap = new Map();

      data.forEach((site) => newMap.set(site.id, site.url))

      return newMap;
    } catch (e) {
      console.error(e);
      return DataServiceErrors.ALL_SITES;
    }
  }

  async getOneSite(_id: number): Promise<Site | DataServiceErrors> {
    try {
      const response = await axios.get(api.sites, {
        params: {
          id: _id
        }
      });

      return response.data as Site;
    } catch (e) {
      console.error(e);
      return DataServiceErrors.ONE_SITE
    }
  }

  async getAllTests(): Promise<Test[] | DataServiceErrors> {
    try {
      const response = await axios.get(api.tests);

      return response.data as Test[];
    } catch (e) {
      console.error(e);
      return DataServiceErrors.ALL_TESTS;
    }
  }

  async getOneTest(_id: number): Promise<Test | DataServiceErrors> {
    try {
      const response = await axios.get(api.tests, {
        params: {
          id: _id
        }
      });

      return response.data as Test;
    } catch (e) {
      console.error(e);
      return DataServiceErrors.ONE_TEST
    }
  }

  async getAppInfo(): Promise<Data> {
    let sitesMap: Map<number, string> = new Map();

    const promise = new Promise(async (res, rej) => {
      await this.getAllSites()
        .then((sites) => sitesMap = sites as sitesMap)
        .catch((errStatus) => rej(errStatus))

      await this.getAllTests()
        .then((tests) => res(normalizeTests(tests as Test[], sitesMap)))
        .catch((errStatus) => rej(errStatus))
    })

    return promise
      .then((data) => ({
        tests: data,
        error: DataServiceErrors.NONE
      } as Data))
      .catch((err) => ({
        tests: [] as NormalizedTest[],
        error: err
      } as Data))
  }
}

export default new DataService();
