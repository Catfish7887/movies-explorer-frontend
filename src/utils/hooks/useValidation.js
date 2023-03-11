import { useEffect, useState } from "react"
import { set } from "react-hook-form";


// Набор парметров для валидации. Возвращает валидность поля, объект с ошибками, и состояние dirty
// Эта функция отвечается за работу валидации
const useValidator = (defaultValue, value, validations) => {
  // Eslint ругается на регулярки, отключу следующие две строчки
  const emailRegExp = /[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+@[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+\.[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+/i; //eslint-disable-line
  const nameRegExp = /^[А-Яёа-яёA-Za-z][а-яёА-ЯёA-Za-z \s '-]+/i; //eslint-disable-line
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState({})
  const isName = nameRegExp.test(value)
  const isEmail = emailRegExp.test(value)
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    value === defaultValue ? setIsDirty(false) : setIsDirty(true);
  }, [defaultValue])

  useEffect(()=>{
    value === defaultValue ? setIsDirty(false) : setIsDirty(true);
    const totalErrors = {}
    for (const validation in validations) {
      switch(validation){
        case 'minLength':
          value.length < validations[validation] ? totalErrors.minLength = `Длина должна быть не менее ${validations[validation]} симв.` : delete totalErrors.minLength;
        break

        case 'required':
          value.length === 0 ? totalErrors.required = 'Это поле обязательно' : delete errors.required;
        break

        case 'name':
          !isName ? totalErrors.name = 'Некорретно введённые данные' : delete totalErrors.name;

        break

        case 'email':
          isEmail  ? delete totalErrors.email : totalErrors.email = 'E-mail должен быть вида email@example.com';
        break

        default:
         console.error('валидация этого параметра не предусмотрена', validation)
         break
        }

      setErrors(totalErrors)

    }
  }, [value])
    return {errors, isDirty, isValid}
}

// С помощью этой функции валидатор читает значение поля формы и валидирует его
// Возвращает два метода и данные, возвращаемые валидатором
export const useValidation = (defaultValue, validations) => {
  const [value, setValue] = useState(defaultValue);
  const [defaultInputValue, setDefaultInputValue] = useState(defaultValue)
  const input = useValidator(defaultInputValue, value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = (value) => {
    // debugger
    setDefaultInputValue(value)
    setValue(value)
  }


  return {
    onChange,
    reset,
    ...input
  }

}


