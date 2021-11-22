import React, {useEffect, useState} from "react";
import Input from "../../Components/Input";
import SearchResult from "../../Components/SearchResult";
import Tests from "../../Components/Tests";
import {Data, NormalizedTest} from "../../Data/types";
import DataService, {DataServiceErrors} from "../../Data/DataService";
import './dashboard.css';
import Header from "../../Components/Header";

const DashBoard = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [data, setData] = useState<Data>({
    tests: [] as NormalizedTest[],
    error: DataServiceErrors.INIT
  })

  useEffect(() => {
    DataService.getAppInfo()
      .then((res) => setData(res))
      .catch((err) => setData(err))
  }, [])

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  }

  const handleClearInput = () => {
    setSearchInput('');
  }

  const handleFilter = (): NormalizedTest[] => {
    return data.tests.filter((testCase) => testCase.name.toLowerCase().includes(searchInput))
  }

  return <>
    <Header title={'dashboard'}/>
    <div className='dashboard'>
      <Input
        counterVal={
          searchInput.length > 0 ? handleFilter().length : data.tests.length
        }
        val={searchInput}
        updateValFunc={handleChangeInput}
        placeholder='What test are you looking for?'
      />
      {
        searchInput.length > 0 ?
          <SearchResult clearResultList={handleClearInput} data={handleFilter()}/>
          : <Tests testsList={data.tests}/>
      }
    </div>
  </>
}

export default DashBoard;
