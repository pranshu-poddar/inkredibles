export const orderMock = [
  {
    id:"1",
    img: "/images/home/collection/man-hoodie.png",
    name: "Man Hoodie",
    price: 500,
    discount: 10,
    color: "red",
    size: "xl",
    quantity: "2",
    status: "initiated",
    address:{
      name:"<NAME>",
      street:"123, ABC Street",
      city:"New York",
      pin:"123456",
      phone:"9876543210",
      email:"<EMAIL>"
    }
  },
];
export type TOrder = typeof orderMock[0];
