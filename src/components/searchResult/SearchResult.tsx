import React from "react";
import {NormalizedTest} from "../../data/types";
import Tests from "../Tests";
import Button from "../button/Button";
import {ButtonColors} from "../button/Button";
import './SearchResult.css';

interface SearchResultProps {
  data: NormalizedTest[],
  clearResultList: () => void
}

const SearchResult = ({data, clearResultList}: SearchResultProps) => {
  if (data.length > 0) {
    return <Tests testsList={data}/>
  } else {
    return <div className='emptyResult'>
      <h4 className='emptyResult__text'>Your search did not match any results.</h4>
      <Button
        callback={clearResultList}
        color={ButtonColors.GREEN}
        text='reset'
      />
    </div>
  }
}

export default SearchResult;
