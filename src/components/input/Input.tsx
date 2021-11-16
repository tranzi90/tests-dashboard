import './Input.css';

interface InputProps {
  placeholder: string,
  val: string,
  counterVal: number,
  updateValFunc: (e: React.FormEvent<HTMLInputElement>) => void
}

const Input = ({placeholder, val, updateValFunc, counterVal}: InputProps) => {
  return <div className='input'>
    <div className='input__img'>
      <img
        src={process.env.PUBLIC_URL + '/Interaction-Search.svg'}
        alt="search"
      />
    </div>
    <input
      onChange={updateValFunc}
      className='input__text'
      placeholder={placeholder}
      type="text"
      value={val}
    />
    <p className='input__count'>
      {counterVal} tests
    </p>
  </div>
}

export default Input;
