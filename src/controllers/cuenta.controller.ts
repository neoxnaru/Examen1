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
import {CuentaCont} from '../models';
import {CuentaContRepository} from '../repositories';

export class CuentaController {
  constructor(
    @repository(CuentaContRepository)
    public cuentaContRepository : CuentaContRepository,
  ) {}

  @post('/cuenta-conts', {
    responses: {
      '200': {
        description: 'CuentaCont model instance',
        content: {'application/json': {schema: getModelSchemaRef(CuentaCont)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuentaCont, {
            title: 'NewCuentaCont',
            exclude: ['id'],
          }),
        },
      },
    })
    cuentaCont: Omit<CuentaCont, 'id'>,
  ): Promise<CuentaCont> {
    return this.cuentaContRepository.create(cuentaCont);
  }

  @get('/cuenta-conts/count', {
    responses: {
      '200': {
        description: 'CuentaCont model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CuentaCont) where?: Where<CuentaCont>,
  ): Promise<Count> {
    return this.cuentaContRepository.count(where);
  }

  @get('/cuenta-conts', {
    responses: {
      '200': {
        description: 'Array of CuentaCont model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CuentaCont, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CuentaCont) filter?: Filter<CuentaCont>,
  ): Promise<CuentaCont[]> {
    return this.cuentaContRepository.find(filter);
  }

  @patch('/cuenta-conts', {
    responses: {
      '200': {
        description: 'CuentaCont PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuentaCont, {partial: true}),
        },
      },
    })
    cuentaCont: CuentaCont,
    @param.where(CuentaCont) where?: Where<CuentaCont>,
  ): Promise<Count> {
    return this.cuentaContRepository.updateAll(cuentaCont, where);
  }

  @get('/cuenta-conts/{id}', {
    responses: {
      '200': {
        description: 'CuentaCont model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CuentaCont, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CuentaCont, {exclude: 'where'}) filter?: FilterExcludingWhere<CuentaCont>
  ): Promise<CuentaCont> {
    return this.cuentaContRepository.findById(id, filter);
  }

  @patch('/cuenta-conts/{id}', {
    responses: {
      '204': {
        description: 'CuentaCont PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuentaCont, {partial: true}),
        },
      },
    })
    cuentaCont: CuentaCont,
  ): Promise<void> {
    await this.cuentaContRepository.updateById(id, cuentaCont);
  }

  @put('/cuenta-conts/{id}', {
    responses: {
      '204': {
        description: 'CuentaCont PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cuentaCont: CuentaCont,
  ): Promise<void> {
    await this.cuentaContRepository.replaceById(id, cuentaCont);
  }

  @del('/cuenta-conts/{id}', {
    responses: {
      '204': {
        description: 'CuentaCont DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cuentaContRepository.deleteById(id);
  }
}
