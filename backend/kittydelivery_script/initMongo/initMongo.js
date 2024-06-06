var mongoose = require("mongoose");
var Order = require("./models_copy/order");
var Notification = require("./models_copy/notification");
var Delivery = require("./models_copy/delivery");
var Menu = require("./models_copy/menu");
var Article = require("./models_copy/article");

var mongoDB = "mongodb://localhost:27017/kittydelivery";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", async function () {
  console.log("Connected to MongoDB");

  let orders = [
    {
      user_id: 1,
      restaurant_id: 1,
      delivery_id: 1,
      order_date: new Date(),
      status: "en cours",
      total_amount: 50.0,
    },
    {
      user_id: 2,
      restaurant_id: 1,
      delivery_id: 2,
      order_date: new Date(),
      status: "livré",
      total_amount: 75.0,
    },
    {
      user_id: 3,
      restaurant_id: 2,
      delivery_id: 3,
      order_date: new Date(),
      status: "annulé",
      total_amount: 20.0,
    },
  ];

  let notifications = [
    {
      type: "info",
      message: "Votre commande est en cours de préparation.",
      date: new Date(),
      user_id: 1,
    },
    {
      type: "warning",
      message: "Votre commande a été retardée.",
      date: new Date(),
      user_id: 2,
    },
    {
      type: "success",
      message: "Votre commande a été livrée.",
      date: new Date(),
      user_id: 2,
    },
    {
      type: "error",
      message: "Votre commande a été annulée.",
      date: new Date(),
      user_id: 3,
    },
  ];

  let deliveries = [
    {
      order_id: 1,
      delivery_status: "livré",
      delivery_date: new Date(),
      delivery_person_id: 1,
      qr_code: "ABC123",
    },
    {
      order_id: 2,
      delivery_status: "en cours",
      delivery_date: new Date(),
      delivery_person_id: 2,
      qr_code: "XYZ789",
    },
    {
      order_id: 3,
      delivery_status: "annulé",
      delivery_date: new Date(),
      delivery_person_id: 3,
      qr_code: "LMN456",
    },
  ];

  let menus = [
    {
      restaurant_id: 1,
      menu_name: "Menu du Jour",
      articles: "1,2,3",
    },
    {
      restaurant_id: 2,
      menu_name: "Menu Italien",
      articles: "4,5",
    },
    {
      restaurant_id: 3,
      menu_name: "Menu Végétarien",
      articles: "6,7,8",
    },
  ];

  let articles = [
    {
      menu_id: 1,
      article_name: "Burger",
      description: "Un délicieux burger",
      price: 10.0,
    },
    {
      menu_id: 1,
      article_name: "Frites",
      description: "Frites croustillantes",
      price: 5.0,
    },
    {
      menu_id: 1,
      article_name: "Soda",
      description: "Boisson gazeuse",
      price: 3.0,
    },
    {
      menu_id: 2,
      article_name: "Pâtes",
      description: "Pâtes aux deux saumons",
      price: 13.0,
    },
    {
      menu_id: 2,
      article_name: "Tiramisu",
      description: "Dessert italien classique",
      price: 6.0,
    },
    {
      menu_id: 3,
      article_name: "Salade",
      description: "Salade de légumes frais",
      price: 7.0,
    },
    {
      menu_id: 3,
      article_name: "Soupe",
      description: "Soupe de légumes",
      price: 5.0,
    },
    {
      menu_id: 3,
      article_name: "Smoothie",
      description: "Smoothie aux fruits",
      price: 4.0,
    },
  ];

  try {
    await Order.deleteMany({});
    await Notification.deleteMany({});
    await Delivery.deleteMany({});
    await Menu.deleteMany({});
    await Article.deleteMany({});
    console.log("Collections réinitialisées");

    await Order.insertMany(orders);
    console.log("Commandes insérées");
    await Notification.insertMany(notifications);
    console.log("Notifications insérées");
    await Delivery.insertMany(deliveries);
    console.log("Livraisons insérées");
    await Menu.insertMany(menus);
    console.log("Menus insérés");
    await Article.insertMany(articles);
    console.log("Articles insérés");
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
});
