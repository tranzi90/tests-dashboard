import {useEffect, useState} from "react";
import Input from "../../components/input/Input";
import SearchResult from "../../components/searchResult/SearchResult";
import Tests from "../../components/tests/Tests";
import {Data, NormalizedTest} from "../../data/types";
import DataService, {DataServiceErrors} from "../../data/DataService";
import './dashboard.css';
import Header from "../../components/header/Header";

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
