const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    //  If we don't parse, just a string will be returned 
    cb(JSON.parse(fileContent));
  });
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    //  Used to create an object
    this.title = title;
    this.imageUrl = imageUrl,
    this.description = description,
    this.price = price
  };

  save() {
    //  Adding this.propertyName adds to the class object
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  };

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product);
    })
  };
};


/*
  Static functions
  //  static, call the method on the class istself, not instances of the class
  //  They tend to be utility functions
  //  Can't be called on instances of the class
*/

// https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png