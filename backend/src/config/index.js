const config = {
  port: 4000,
  secrets: {
    jwt: 'toptalrestaurantreviewapplication',
    jwtExp: '100d'
  },
  dbUrl: 'mongodb://localhost:27017/restaurants-db'
}

export const Role = {
  Admin: 'admin',
  Owner: 'owner',
  Customer: 'customer'
}

export default config;