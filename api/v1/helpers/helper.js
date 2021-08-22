exports.saveCB = function (err, next) {
  if (err) {
    console.log(err);
    return next(err);
  }
};

exports.createError = function (errFor, msg) {
  const error = [
    {
      param: errFor,
      msg: msg,
    },
  ];
  return error;
};

exports.mapProductsListDTO = function (productList) {
  const retProductList = [];
  for (let product of productList) {
    let tempProduct = {
      name: product.name,
      description: product.description,
      id: product._id,
      mrp: product.price.mrp,
      offerPrice: product.price.offerPrice,
      src: product.images[0],
      imageAlt: product.name + " illustrative image",
    };
    retProductList.push(tempProduct);
  }

  return retProductList;
};

exports.mapCartToDTO = function (cart) {
  const retCartList = [];
  for (let orderItem of cart.orderItems) {
    let tempOrderItem = {
      id: orderItem.product._id,
      src: orderItem.product.images[0],
      title: orderItem.product.name,
      description: orderItem.product.description,
      quantity: orderItem.quantity,
      offerPrice: orderItem.freezedPrice,
      mrp: orderItem.mrp,
      discount: null,
    };
    retCartList.push(tempOrderItem);
  }
  return retCartList;
};

exports.mapAddressToDTO = function (addressList) {
  const retAddressList = [];
  for (let address of addressList) {
    let tempAddress = {
      id: address._id,
      name: address.name,
      mobile: address.mobile,
      city: address.city,
      locality: address.locality,
      pincode: address.pincode,
      state: address.state,
      addressLine: address.addressLine,
    };
    retAddressList.push(tempAddress);
  }
  return retAddressList;
};
