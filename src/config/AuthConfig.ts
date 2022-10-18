interface options {
  secret: string
  expiresIn: string
}

interface JWT {
  jwt: options
}

export default {
  jwt: {
    secret: process.env.API_SECRET,
    expiresIn: '1d',
  },
} as JWT
