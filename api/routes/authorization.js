import express from 'express';
import authenticationController from '../controllers/authorization';
import jsonPatchController from '../controllers/jsonpatch';
const router = express.Router();

router.post('/login', authenticationController.login);
router.patch('/jsonpatcher', jsonPatchController.patchPayload);

export default router;