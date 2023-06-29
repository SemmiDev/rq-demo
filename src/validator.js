import * as yup from 'yup';

export const yupLoginSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup
            .string()
            .min(8)
            .max(32)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                'Password harus terdiri dari huruf besar, huruf kecil, angka, dan simbol'
            )
            .required(),
    })
    .required();
