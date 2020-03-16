/**
 * GRGP.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    teamName: {
      type: "string",
      required: true,
    },

    phone: {
      type: "number"
    },

    email: {
      type: "string"
    },

    chiName1: {
      type: "string"
    },

    engName1: {
      type: "string"
    },

    ID1: {
      type: "string",
      required: true,
    },

    birth1: {
      type: "string"
    },

    chiName2: {
      type: "string"
    },

    engName2: {
      type: "string"
    },

    ID2: {
      type: "string",
      required: true,
    },

    birth2: {
      type: "string"
    },

    chiName3: {
      type: "string"
    },

    engName3: {
      type: "string"
    },

    ID3: {
      type: "string",
      required: true,
    },

    birth3: {
      type: "string"
    },

    chiName4: {
      type: "string"
    },

    engName4: {
      type: "string"
    },

    ID4: {
      type: "string",
      required: true,
    },

    birth4: {
      type: "string"
    },

    chiName5: {
      type: "string"
    },

    engName5: {
      type: "string"
    },

    ID5: {
      type: "string",
      required: true,
    },

    birth5: {
      type: "string"
    },

    chiName6: {
      type: "string"
    },

    engName6: {
      type: "string"
    },

    ID6: {
      type: "string",
      required: true,
    },

    birth6: {
      type: "string"
    },

    coachName: {
      type: "string"
    },

    coachPhone: {
      type: "number"
    },

    leaderName: {
      type: "string"
    },

    leaderPosition: {
      type: "string"
    },

    NoOfTeam: {
      type: "number"
    },

    teamFee: {
      type: "number"
    },

    NoOfPeople: {
      type: "number"
    },

    insurance: {
      type: "number"
    },

    total: {
      type: "number"
    },

    confirm: {
      type: "string"
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

