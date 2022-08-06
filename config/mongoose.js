const express = require("express");
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("mongoose is working");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://kk095:Krishankant$095@cluster0.hoemh3q.mongodb.net/products"
  );
}
