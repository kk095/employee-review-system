const express = require("express");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: true,
    },
    reviewTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    reviewFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    star: {
      type: Number,
      min: 1,
      max: 5,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
