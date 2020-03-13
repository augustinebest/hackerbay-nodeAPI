import express from 'express';
import authenticationController from '../controllers/authorization';
import jsonPatchController from '../controllers/jsonpatch';
import thumbnailController from '../controllers/thumbnail';
import authenticate from '../services/authService';

const router = express.Router();

router.post('/login', authenticationController.login);
router.patch('/jsonpatcher', authenticate.verifyUser, jsonPatchController.patchPayload);
router.get('/generateThumbnail', authenticate.verifyUser, thumbnailController.generateThumbnail);

export default router;