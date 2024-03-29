import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export async function checkTripBody(req: Request, res: Response, next: NextFunction) {
  console.log('req.body ===', req.body);

  const tripValdationSchema = Yup.object({
    name: Yup.string().min(3).max(255).required(),
    date: Yup.date().min('2024-03-18').required(),
    country: Yup.string().min(3).max(255).required(),
    city: Yup.string().min(3).max(255).required(),
    description: Yup.string().min(10).required(),
    rating: Yup.number().min(0).max(5).required(),
    price: Yup.number().min(0).required(),
    image_main: Yup.string().min(3).max(255).required(),
    images_1: Yup.string().trim().min(3).max(255),
    images_2: Yup.string().min(3).max(255),
    images_3: Yup.string().min(3).max(255),
  });

  try {
    const rez = await tripValdationSchema.validate(req.body, { abortEarly: false });
    console.log('rez ===', rez);
    next();
    // res.json(rez);
  } catch (error) {
    const yupError = error as Yup.ValidationError;
    console.log('validation fail', error);

    let obj = {};
    yupError.inner.forEach((eObj) => {
      // return { path: eObj.path, msg: eObj.message };
      const key = eObj.path;
      obj = { ...obj, [key || '_']: eObj.message };
    });

    return res.status(400).json(obj);
  }
}