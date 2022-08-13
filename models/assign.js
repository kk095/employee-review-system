const express = require("express");
const mongoose = require("mongoose");

// MODELS FOR ALL ASSIGNED REVIEWS
const assignSchema = new mongoose.Schema(
  {
    reviewTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    reviewFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

const Assign = mongoose.model("Assign", assignSchema);

module.exports = Assign;
