const express = require("express");
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
  },
  reviewbyme: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  reviewtome: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
