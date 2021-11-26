import React, {useEffect} from "react";
import Gag from "../components/gag/Gag";
import Header from "../components/header/Header";
import {useParams} from "react-router-dom";
import DataService from "../data/DataService";

type ResultsParams = {
  resultId: string
}

const Results = () => {
  const {resultId} = useParams<ResultsParams>();

  useEffect(() => {
    if (resultId) {
      DataService.getOneTest(Number(resultId))
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }
  }, [])

  return <>
    <Header title={'results'}/>
    <Gag text='Order basket redesing'/>
  </>
}

export default Results;
