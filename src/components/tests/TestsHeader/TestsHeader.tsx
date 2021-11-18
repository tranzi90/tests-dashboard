import React, {useEffect, useState} from "react";
import './TestsHeader.css';
import {SortFields, SortTests, SortTypes} from "../Tests";

interface TestHeaderProps {
  sortTableFunc: (field: SortFields) => void,
  sortInfo: SortTests
}

type HeaderFields = {
  fields: SortFields[],
  activeFieldIndex: number
}

const TestsHeader = ({sortTableFunc, sortInfo: {field, order}}: TestHeaderProps) => {
  const [cells, setCells] = useState<HeaderFields>({
    fields: ['name', 'type', 'status', 'site'],
    activeFieldIndex: 0
  });

  useEffect(() => {
    setCells(prevState => ({
      fields: prevState.fields,
      activeFieldIndex: prevState.fields.indexOf(field)
    }))
  }, [field])

  return <div className='tests__wrapper tests__header'>
    {
      cells.fields.map((curField, curIndex) => <p
        className={`sort ${curIndex === cells.activeFieldIndex ? 'sort__active' : ''} ${order === SortTypes.ASC ? 'sort__active_asc' : 'sort__active_desc'}`}
        onClick={() => sortTableFunc(curField)}
        key={curField}
      >
        {curField}
      </p>)
    }
  </div>
}

export default TestsHeader;
