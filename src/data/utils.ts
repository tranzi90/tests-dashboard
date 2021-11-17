import {NormalizedTest, sitesMap, Test} from "./types";

const siteColors: string[] = ['#E14165', '#8686FF', '#C2C2FF'];
const exceptionList: RegExp[] = [/http:\/\//i, /https:\/\//i, /www./i];

export const normalizeTests = (testCase: Test[], sitesMap: sitesMap): NormalizedTest[] => {
  const sitesColors: string[] = siteColors;
  const siteNamesMapColors: Map<string, string> = new Map();

  return testCase.reduce((acc: NormalizedTest[], cur: Test) => {
    let siteName = sitesMap.get(cur.siteId) as string;
    let siteColor = '';

    exceptionList.forEach((exception) => siteName = siteName.replace(exception, ''))

    if (!siteNamesMapColors.get(siteName) && sitesColors.length > 0) {
      const poppedColor: string = sitesColors.pop() as string;
      siteColor = poppedColor;
      siteNamesMapColors.set(siteName, poppedColor);
    } else {
      siteColor = siteNamesMapColors.get(siteName) as string;
    }

    const testCase: NormalizedTest = {
      ...cur,
      site: siteName,
      color: siteColor
    };

    acc.push(testCase);
    return acc;
  }, [] as NormalizedTest[])
}