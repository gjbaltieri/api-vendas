import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateProductService from '../../../services/CreateProductService'
import DeleteProductService from '../../../services/DeleteProductService'
import ListProductService from '../../../services/ListProductService'
import ShowProductService from '../../../services/ShowProductService'
import UpdateProductService from '../../../services/UpdateProductService'

class ProductController {
  public async listAll(request: Request, response: Response): Promise<Response> {
    const listAll = container.resolve(ListProductService)
    const product = await listAll.execute()

    return response.json(product)
  }

  public async listOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const listOne = container.resolve(ShowProductService)
    const products = await listOne.execute(id)

    return response.json(products)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const createProduct = container.resolve(CreateProductService)
    const product = await createProduct.execute({ name, price, quantity })

    return response.json(product)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, price, quantity } = request.body
    const updateProduct = container.resolve(UpdateProductService)
    const product = await updateProduct.execute(id, { name, price, quantity })

    return response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteProduct = container.resolve(DeleteProductService)
    await deleteProduct.execute(id)
    return response.json([])
  }
}

export default ProductController
