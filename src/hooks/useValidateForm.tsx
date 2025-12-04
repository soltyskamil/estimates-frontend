import { useCallback, useState } from "react";

type FormErrors<T> = {
  [key in keyof T]: string;
};

export type Validator<T> = (formData: T) => FormErrors<T>;

const useValidateForm = <T,>(validator: Validator<T>) => {
  const [errors, setErrors] = useState<FormErrors<T> | null>(null);

  const validateForm = useCallback((formData: T) => {
    const errors = validator(formData);

    if (Object.values(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      setErrors(null);
      return true;
    }
  }, []);

  const getErrorStatus = useCallback(
    (K: keyof T) => {
      if (!errors) return false;
      return !!errors[K];
    },
    [errors]
  );

  return {
    getErrorStatus,
    errors,
    validateForm,
  };
};

export default useValidateForm;
