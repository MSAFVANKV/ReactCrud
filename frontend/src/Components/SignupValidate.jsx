import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(6, 'Password is too short - should be 6 chars minimum.').required('Password is Required'),
});
export const SignupAdminSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().min(6, 'Password is too short - should be 6 chars minimum.').required('Password is Required'),
    UserType:Yup.string().required('userType is Required'),
});