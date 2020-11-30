import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CatalogoC} from '../models';
import {CatalogoCRepository} from '../repositories';

export class CatalagoController {
  constructor(
    @repository(CatalogoCRepository)
    public catalogoCRepository : CatalogoCRepository,
  ) {}

  @post('/catalogo-cs', {
    responses: {
      '200': {
        description: 'CatalogoC model instance',
        content: {'application/json': {schema: getModelSchemaRef(CatalogoC)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoC, {
            title: 'NewCatalogoC',
            exclude: ['id'],
          }),
        },
      },
    })
    catalogoC: Omit<CatalogoC, 'id'>,
  ): Promise<CatalogoC> {
    return this.catalogoCRepository.create(catalogoC);
  }

  @get('/catalogo-cs/count', {
    responses: {
      '200': {
        description: 'CatalogoC model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CatalogoC) where?: Where<CatalogoC>,
  ): Promise<Count> {
    return this.catalogoCRepository.count(where);
  }

  @get('/catalogo-cs', {
    responses: {
      '200': {
        description: 'Array of CatalogoC model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CatalogoC, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CatalogoC) filter?: Filter<CatalogoC>,
  ): Promise<CatalogoC[]> {
    return this.catalogoCRepository.find(filter);
  }

  @patch('/catalogo-cs', {
    responses: {
      '200': {
        description: 'CatalogoC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoC, {partial: true}),
        },
      },
    })
    catalogoC: CatalogoC,
    @param.where(CatalogoC) where?: Where<CatalogoC>,
  ): Promise<Count> {
    return this.catalogoCRepository.updateAll(catalogoC, where);
  }

  @get('/catalogo-cs/{id}', {
    responses: {
      '200': {
        description: 'CatalogoC model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CatalogoC, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CatalogoC, {exclude: 'where'}) filter?: FilterExcludingWhere<CatalogoC>
  ): Promise<CatalogoC> {
    return this.catalogoCRepository.findById(id, filter);
  }

  @patch('/catalogo-cs/{id}', {
    responses: {
      '204': {
        description: 'CatalogoC PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatalogoC, {partial: true}),
        },
      },
    })
    catalogoC: CatalogoC,
  ): Promise<void> {
    await this.catalogoCRepository.updateById(id, catalogoC);
  }

  @put('/catalogo-cs/{id}', {
    responses: {
      '204': {
        description: 'CatalogoC PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() catalogoC: CatalogoC,
  ): Promise<void> {
    await this.catalogoCRepository.replaceById(id, catalogoC);
  }

  @del('/catalogo-cs/{id}', {
    responses: {
      '204': {
        description: 'CatalogoC DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.catalogoCRepository.deleteById(id);
  }
}
