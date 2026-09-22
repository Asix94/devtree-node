import { Router } from 'express';
import { body } from 'express-validator';
import { createAcount, getUser, getUserByHandle, login, updateProfile, uploadImage } from './handlers';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

const router = Router();

router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('El Handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('E-mail no valido'),
    body('password')
        .isLength({min: 8})
        .withMessage('El Password es muy corto minimo 8 caracteres'),
    handleInputErrors,
    createAcount
);

router.post('/auth/login', 
    body('email')
        .isEmail()
        .withMessage('E-mail no valido'),
    body('password')
        .notEmpty()
        .withMessage('El Password es obligatorio'),
    handleInputErrors,
    login 
);

router.get('/user', authenticate, getUser);
router.patch('/user', 
    body('handle')
        .notEmpty()
        .withMessage('El Handle no puede ir vacio'),
    body('description')
        .notEmpty()
        .withMessage('La Descripción no puede ir vacia'),
    handleInputErrors,
    authenticate, 
    updateProfile
);

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

export default router;