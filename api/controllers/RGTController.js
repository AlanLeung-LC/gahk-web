/**
 * RGTController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    create: async function (req, res) {

        if (req.method == 'GET')
            return res.view('competition/form/rgt');

        // req.file('avatarfile').upload({maxBytes: 10000000}, async function whenDone(err, uploadedFiles) {
        //     if (err) { return res.serverError(err); }
        //     if (uploadedFiles.length == 0){ return res.badRequest('No file was uploaded'); }

        await RGT.create(req.body.RGT);

        // await Form.update({id: req.body.id}, {
        //     avatarPath: uploadedFiles[0].fd
        // });

        return res.ok("Successfully created!");
        // });
    },



};

