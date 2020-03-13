import jsonpatch from 'jsonpatch';

class JsonPatch {
    patchPayload(req, res) {
        try {
            let myDoc = typeof (req.body.document) == "string" ? JSON.parse(req.body.document) : req.body.document,
                thePatch = typeof (req.body.patch) == "string" ? JSON.parse(req.body.patch) : req.body.patch,
                patchedDocument = jsonpatch.apply_patch(myDoc, thePatch);
            return res.status(200).send({
                status: true,
                result: patchedDocument
            })
        } catch (error) {
            res.status(500).send({err: error});
        }
    }
}

export default new JsonPatch;