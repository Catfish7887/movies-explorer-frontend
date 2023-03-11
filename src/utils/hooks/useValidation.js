import { useEffect, useState } from "react"
import { set } from "react-hook-form";

const useValidator = (defaultValue, value, validations) => {
  const emailRegExp = /[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+@[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+\.[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+/i;
  const nameRegExp = /^[А-ЯЁа-яёa-zA-Z \s '-]+/i;
  const [isDirty, setIsDirty] = useState(false)
  const [errors, setErrors] = useState({})

  const isValid = Object.keys(errors).length === 0;

  useEffect(()=>{
    const totalErrors = {}
    value === defaultValue ? setIsDirty(false) : setIsDirty(true);
    for (const validation in validations) {
      switch(validation){
        case 'minLength':
          value.length < validations[validation] ? totalErrors.minLength = `Длина должна быть не менее ${validations[validation]} симв.` : delete totalErrors.minLength;
        break

        case 'required':
          value.length === 0 ? totalErrors.required = 'Это поле обязательно' : delete errors.required;
        break

        case 'name':
          value.match(nameRegExp) ? delete totalErrors.name : errors.name = 'Некорретно введённые данные';
        break

        case 'email':
          value.match(emailRegExp)  ? delete totalErrors.email : totalErrors.email = 'E-mail должен быть вида email@example.com';
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

export const useValidation = (defaultValue, validations) => {
  const [value, setValue] = useState(defaultValue);
  const input = useValidator(defaultValue, value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = (e) => {
    setValue(defaultValue)
    e.value = defaultValue
  }

  return {
    onChange,
    reset,
    ...input
  }

}


