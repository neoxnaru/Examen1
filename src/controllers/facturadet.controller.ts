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
import {FacturaDet} from '../models';
import {FacturaDetRepository} from '../repositories';

export class FacturadetController {
  constructor(
    @repository(FacturaDetRepository)
    public facturaDetRepository : FacturaDetRepository,
  ) {}

  @post('/factura-dets', {
    responses: {
      '200': {
        description: 'FacturaDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(FacturaDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaDet, {
            title: 'NewFacturaDet',
            exclude: ['id'],
          }),
        },
      },
    })
    facturaDet: Omit<FacturaDet, 'id'>,
  ): Promise<FacturaDet> {
    return this.facturaDetRepository.create(facturaDet);
  }

  @get('/factura-dets/count', {
    responses: {
      '200': {
        description: 'FacturaDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FacturaDet) where?: Where<FacturaDet>,
  ): Promise<Count> {
    return this.facturaDetRepository.count(where);
  }

  @get('/factura-dets', {
    responses: {
      '200': {
        description: 'Array of FacturaDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(FacturaDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(FacturaDet) filter?: Filter<FacturaDet>,
  ): Promise<FacturaDet[]> {
    return this.facturaDetRepository.find(filter);
  }

  @patch('/factura-dets', {
    responses: {
      '200': {
        description: 'FacturaDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaDet, {partial: true}),
        },
      },
    })
    facturaDet: FacturaDet,
    @param.where(FacturaDet) where?: Where<FacturaDet>,
  ): Promise<Count> {
    return this.facturaDetRepository.updateAll(facturaDet, where);
  }

  @get('/factura-dets/{id}', {
    responses: {
      '200': {
        description: 'FacturaDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FacturaDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FacturaDet, {exclude: 'where'}) filter?: FilterExcludingWhere<FacturaDet>
  ): Promise<FacturaDet> {
    return this.facturaDetRepository.findById(id, filter);
  }

  @patch('/factura-dets/{id}', {
    responses: {
      '204': {
        description: 'FacturaDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaDet, {partial: true}),
        },
      },
    })
    facturaDet: FacturaDet,
  ): Promise<void> {
    await this.facturaDetRepository.updateById(id, facturaDet);
  }

  @put('/factura-dets/{id}', {
    responses: {
      '204': {
        description: 'FacturaDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() facturaDet: FacturaDet,
  ): Promise<void> {
    await this.facturaDetRepository.replaceById(id, facturaDet);
  }

  @del('/factura-dets/{id}', {
    responses: {
      '204': {
        description: 'FacturaDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.facturaDetRepository.deleteById(id);
  }
}
