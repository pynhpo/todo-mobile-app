import * as yup from 'yup';

const emailRegExp = /^\w+([\\.+]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('email is required')
    .email('please enter a valid email format')
    .matches(emailRegExp, 'please enter a valid email format'),
  password: yup.string().required('password is required'),
});
