/**
 * TRGPController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //(preview)
    TRGPForm: async function (req, res) {

        if (req.method == 'GET') { return res.view('pages/competition/form/TRGPForm', { 'data': req.session.data || {} }); }

        req.session.data = req.body.TRGP;

        return res.view('pages/competition/form/TRGPFormPreview', { 'data': req.session.data || {} });
    },

    //(create)
    //action - create 
    TRGPFormPreview: async function (req, res) {

        if (req.method == 'POST') {
            req.session.data.payStatus = "unpaid";
            req.session.data.formStatus = "ToBeCon";
            req.session.data.teamStatus = "suTeam";
            await TRGP.create(req.session.data);
            var model = await TRGP.findOne(req.session.data);
            await TRGP.update(model.id).set({
                idCode: "TRGP2020-" + model.id
            })
            model["idCode"] = "TRGP2020-" + model.id;
            req.session.data = {};  //clear data of session

            return res.view('pages/competition/form/confirm_form', { 'form': model });
        }
    },



    // admin/HandleApply
    //update form
    TRGP_update: async function (req, res) {
        if (req.method == "GET") {
            var model = await TRGP.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('admin/applyHandle/TRGPEdit', { TRGP: model });

        } else {
            if (!req.body.TRGP)
                return res.badRequest("Form-data not received.");

            var models = await TRGP.update(req.params.id).set({
                teamName: req.body.TRGP.teamName,
                Phone: req.body.TRGP.Phone,
                Email: req.body.TRGP.Email,
                CoachName: req.body.TRGP.CoachName,
                CoachPhone: req.body.TRGP.CoachPhone,
                category: req.body.TRGP.category,
                havecname1: req.body.TRGP.havecname1,
                Mate1ChiName: req.body.TRGP.Mate1ChiName,
                Mate1EngName: req.body.TRGP.Mate1EngName,
                Mate1IDNo: req.body.TRGP.Mate1IDNo,
                Mate1Date: req.body.TRGP.Mate1Date,
                havecname2: req.body.TRGP.havecname2,
                Mate2ChiName: req.body.TRGP.Mate2ChiName,
                Mate2EngName: req.body.TRGP.Mate2EngName,
                Mate2IDNo: req.body.TRGP.Mate2IDNo,
                Mate2Date: req.body.TRGP.Mate2Date,
                havecname3: req.body.TRGP.havecname3,
                Mate3ChiName: req.body.TRGP.Mate3ChiName,
                Mate3EngName: req.body.TRGP.Mate3EngName,
                Mate3IDNo: req.body.TRGP.Mate3IDNo,
                Mate3Date: req.body.TRGP.Mate3Date,
                havecname4: req.body.TRGP.havecname4,
                Mate4ChiName: req.body.TRGP.Mate4ChiName,
                Mate4EngName: req.body.TRGP.Mate4EngName,
                Mate4IDNo: req.body.TRGP.Mate4IDNo,
                Mate4Date: req.body.TRGP.Mate4Date,
                TeamNumber: req.body.TRGP.TeamNumber,
                TeamPrice: req.body.TRGP.TeamPrice,
                TeamTotalPrice: req.body.TRGP.TeamTotalPrice,
                leaderName: req.body.TRGP.leaderName,
                leaderPosition: req.body.TRGP.leaderPosition,
                Declaration: req.body.TRGP.Declaration,
                VBRC: req.body.TRGP.VBRC,
                payStatus: req.body.TRGP.payStatus,
                formStatus: req.body.TRGP.formStatus,
                teamStatus: req.body.TRGP.teamStatus,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.redirect('/admin/applyHandle/search');
        }
    },



    confirmAll: async function (req, res) {

        if (req.method == "GET") return res.forbidden();

        var condition = {};

        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await TRGP.find({
            where: condition
        });

        if (models.length == 0) return res.notFound();

        models.forEach(async function (model) {
            if (model.formStatus == "ToBeCon" || model.formStatus == "dataDef") {
                await TRGP.update(model.id).set({ formStatus: "accepted" })
            }
        });

        if (req.wantsJSON) {
            return res.json({ message: "已確認全部申請表 Sucessfully confirm all applications.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    // action - confirm form
    confirm: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ formStatus: "accepted" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被確認 Application has been accepted.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }
    },

    reject: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ formStatus: "rejected" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請已被拒絕 Application has been rejected.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    dataDef: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ formStatus: "dataDef" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請資料不全 Data Deficiency.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    waitingList: async function (req, res) {
        if (req.method == "GET") return res.forbidden();

        var models = await TRGP.update(req.params.id).set({ teamStatus: "waitTeam" }).fetch();

        if (models.length == 0) return res.notFound();

        if (req.wantsJSON) {
            return res.json({ message: "申請隊伍/團體已設為後補 Applied Team/Group has been set on waiting list.", url: '/admin/applyHandle/search' });    // for ajax request
        } else {
            return res.redirect('/admin/applyHandle/search');           // for normal request
        }

    },

    export_xlsx: async function (req, res) {
        var condition = {};

        if (req.session.searchResult.category) condition.category = req.session.searchResult.category;
        if (req.session.searchResult.payStatus) condition.payStatus = req.session.searchResult.payStatus;
        if (req.session.searchResult.formStatus) condition.formStatus = req.session.searchResult.formStatus;
        if (req.session.searchResult.teamStatus) condition.teamStatus = req.session.searchResult.teamStatus;

        var models = await TRGP.find({
            where: condition
        });

        var XLSX = require('xlsx');
        var wb = XLSX.utils.book_new();
        var payStatus, formStatus, teamStatus;
        var ws = XLSX.utils.json_to_sheet(models.map(model => {

            var n = new Date(model.createdAt);
            var cmonth = n.getMonth() + 1;
            var applyDate = n.getDate() + "/" + cmonth + "/" + n.getFullYear();

            var m = new Date(model.updatedAt);
            var umonth = m.getMonth() + 1;
            var updateDate = m.getDate() + "/" + umonth + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

            if (model.payStatus == "paid") {
                payStatus = "已付款 Paid";
            } else {
                payStatus = "未付款 Unpaid";
            }

            if (model.formStatus == "ToBeCon") {
                formStatus = "待處理 To be handled";
            } else if (model.formStatus == "accepted") {
                formStatus = "已確認 Accepted";
            } else if (model.formStatus == "rejected") {
                formStatus = "已拒絕 Rejected";
            } else if (model.formStatus == "dataDef") {
                formStatus = "資料不全 Data Deficiency";
            }

            if (model.teamStatus == "suTeam") {
                teamStatus = "正選 Successful Team";
            } else {
                teamStatus = "後補 Team on Waitiing List";
            }

            return {
                "申請表編號 Application Number": model.idCode,
                "機構名稱(中文) Organization Name(Chinese)": model.teamName,
                "聯絡電話 Contact Number": model.Phone,
                "聯絡電郵 Email Address": model.Email,
                "教練姓名 Coach Name": model.CoachName,
                "教練聯絡電話 Coach Contact Number": model.CoachPhone,
                "參賽組別 Category": model.category,
                "參加者(1)是否有中文姓名 Applicant(1) Any Chinese name": model.havecname1,
                "參加者(1)中文姓名 Applicant(1) Name in Chinese": model.Mate1ChiName,
                "參加者(1)英文姓名 Applicant(1) Name in English": model.Mate1EngName,
                "參加者(1)身分證號碼  Applicant(1) ID Card Number": model.Mate1IDNo,
                "參加者(1)出生日期  Applicant(1) Date of Birth (yyyy-mm-dd)": model.Mate1Date,
                "參加者(2)是否有中文姓名 Applicant(2) Any Chinese name": model.havecname2,
                "參加者(2)中文姓名 Applicant(2) Name in Chinese": model.Mate2ChiName,
                "參加者(2)英文姓名 Applicant(2) Name in English": model.Mate2EngName,
                "參加者(2)身分證號碼  Applicant(2) ID Card Number": model.Mate2IDNo,
                "參加者(2)出生日期  Applicant(2) Date of Birth (yyyy-mm-dd)": model.Mate2Date,
                "參加者(3)是否有中文姓名 Applicant(3) Any Chinese name": model.havecname3,
                "參加者(3)中文姓名 Applicant(3) Name in Chinese": model.Mate3ChiName,
                "參加者(3)英文姓名 Applicant(3) Name in English": model.Mate3EngName,
                "參加者(3)身分證號碼  Applicant(3) ID Card Number": model.Mate3IDNo,
                "參加者(3)出生日期  Applicant(3) Date of Birth (yyyy-mm-dd)": model.Mate3Date,
                "參加者(4)是否有中文姓名 Applicant(4) Any Chinese name": model.havecname4,
                "參加者(4)中文姓名 Applicant(4) Name in Chinese": model.Mate4ChiName,
                "參加者(4)英文姓名 Applicant(4) Name in English": model.Mate4EngName,
                "參加者(4)身分證號碼  Applicant(4) ID Card Number": model.Mate4IDNo,
                "參加者(4)出生日期  Applicant(4) Date of Birth (yyyy-mm-dd)": model.Mate4Date,
                "團體項目(隊) Group Event(team(s)) ": model.TeamNumber,
                "費用(hk$)": model.TeamPrice,
                "總額 Total price($)": model.TeamTotalPrice,
                "機構負責人姓名 Leader's Name": model.leaderName,
                "機構負責人職位 Leader's Position": model.leaderPosition,
                "付款狀況 Payment Status": payStatus,
                "申請狀況 Apply Status": formStatus,
                "隊伍/團體狀況 Team Status": teamStatus,
                "提交日期 Apply Date (dd/mm/yyyy)": applyDate,
                "上次更新 Last upadated": updateDate,
            }
        }));
        XLSX.utils.book_append_sheet(wb, ws, "TRGP");
        res.set("Content-disposition", "attachment; filename=TRGP.xlsx");
        return res.end(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
    },




};

