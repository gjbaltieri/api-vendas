import { Request, Response } from 'express'
import CreateProductService from '../infra/http/services/CreateProductService'
import DeleteProduct from '../infra/http/services/DeleteProductService'
import ListProductService from '../infra/http/services/ListProductService'
import ShowProductService from '../infra/http/services/ShowProductService'
import UpdateProductService from '../infra/http/services/UpdateProductService'

class ProductController {
  public async listAll(request: Request, response: Response): Promise<Response> {
    const listOne = new ListProductService()
    const product = await listOne.execute()

    return response.json(product)
  }

  public async listOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const listAll = new ShowProductService()
    const products = await listAll.execute(id)

    return response.json(products)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const createProduct = new CreateProductService()
    const product = await createProduct.execute({ name, price, quantity })

    return response.json(product)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, price, quantity } = request.body
    const updateProduct = new UpdateProductService()
    const product = await updateProduct.execute(id, { name, price, quantity })

    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteProduct = new DeleteProduct()
    await deleteProduct.execute({ id })
    return response.json([])
  }
}

export default ProductController
