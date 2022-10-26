import { IBCryptoHashProvider } from '../models/IBCryptoHashProvider'
import { compare, hash } from 'bcryptjs'

class BCryptoHashProvider implements IBCryptoHashProvider {
  async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8)
  }
  async compareHash(payload: string, hash: string): Promise<boolean> {
    return await compare(payload, hash)
  }
}
export default BCryptoHashProvider
