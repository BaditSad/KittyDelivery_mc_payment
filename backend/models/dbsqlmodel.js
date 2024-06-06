// User model
class User {
    constructor(user_id, email, role, password, account_status, user_name, telephone, address) {
        this.user_id = user_id;
        this.email = email;
        this.role = role;
        this.password = password;
        this.account_status = account_status;
        this.user_name = user_name;
        this.telephone = telephone;
        this.address = address;
    }
}

// Restaurant model
class Restaurant {
    constructor(restaurant_id, telephone, address, user_id, restaurant_name) {
        this.restaurant_id = restaurant_id;
        this.telephone = telephone;
        this.address = address;
        this.user_id = user_id;
        this.restaurant_name = restaurant_name;
    }
}

// ApiKey model
class ApiKey {
    constructor(api_key_id, user_id, api_key, permissions, expiration_date) {
        this.api_key_id = api_key_id;
        this.user_id = user_id;
        this.api_key = api_key;
        this.permissions = permissions;
        this.expiration_date = expiration_date;
    }
}

// Address model
class Address {
    constructor(address_id, address) {
        this.address_id = address_id;
        this.address = address;
    }
}

// Region model
class Region {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

// City model
class City {
    constructor(id, name, region_id) {
        this.id = id;
        this.name = name;
        this.region_id = region_id;
    }
}

// Neighborhood model
class Neighborhood {
    constructor(id, name, city_id) {
        this.id = id;
        this.name = name;
        this.city_id = city_id;
    }
}

module.exports = { User, Restaurant, ApiKey, Address, Region, City, Neighborhood };
