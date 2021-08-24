import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Input, Tag } from 'antd';
import message from 'antd/es/message';
import './styles.css'

const InputTag = (props) => {
  const [value, setValue] = useState([])
  const [valueInput, setValueInput] = useState('')
  const inputRef = useRef(null);

  useEffect(()=>{
    props.isSubmit && setValue([])
  },[props.isSubmit])

  function pressEnter(e) {
    if (e.target.value) {
      setValue([...value, e.target.value])
      setValueInput('')
    } else {
      message.error('Ошибка')
    }
  }

  function focus() {
    inputRef.current && inputRef.current.focus()
  }

  function preventDefault(str, e) {
    e.preventDefault();
    setValue(value.filter(item => item !== str))
  }

  function handleChange(e) {
    let elm = e.target;
    setValueInput(elm.value)
  }

  function keyDown(e) {
    if (e.keyCode === 8 && !valueInput) {
      setValue(value.filter(function (v, i, ar) {
        return i !== ar.length - 1
      }))
    }
  }

  const tags = useMemo(()=> value.map((item, index) => (<li key={index} style={{ float: 'left', marginBottom: '8px' }}>
      <Tag closable onClose={(e) => preventDefault(item, e)}>
        {item}
      </Tag>
    </li>)),[value])

  return (<>
      <div onClick={focus} className='wrap'>
        <ul className='ulClass'>
          {value && value.length > 0 && tags}
          <li style={{ float: 'left' }}>
            <Input onKeyDown={keyDown} ref={inputRef} value={valueInput} className='inputClass' onPressEnter={pressEnter} onChange={handleChange} />
          </li>
        </ul>
      </div>
  </>);
}

export default InputTag;