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
import {PedidoDet} from '../models';
import {PedidoDetRepository} from '../repositories';

export class PedidodetController {
  constructor(
    @repository(PedidoDetRepository)
    public pedidoDetRepository : PedidoDetRepository,
  ) {}

  @post('/pedido-dets', {
    responses: {
      '200': {
        description: 'PedidoDet model instance',
        content: {'application/json': {schema: getModelSchemaRef(PedidoDet)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoDet, {
            title: 'NewPedidoDet',
            exclude: ['id'],
          }),
        },
      },
    })
    pedidoDet: Omit<PedidoDet, 'id'>,
  ): Promise<PedidoDet> {
    return this.pedidoDetRepository.create(pedidoDet);
  }

  @get('/pedido-dets/count', {
    responses: {
      '200': {
        description: 'PedidoDet model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PedidoDet) where?: Where<PedidoDet>,
  ): Promise<Count> {
    return this.pedidoDetRepository.count(where);
  }

  @get('/pedido-dets', {
    responses: {
      '200': {
        description: 'Array of PedidoDet model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PedidoDet, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PedidoDet) filter?: Filter<PedidoDet>,
  ): Promise<PedidoDet[]> {
    return this.pedidoDetRepository.find(filter);
  }

  @patch('/pedido-dets', {
    responses: {
      '200': {
        description: 'PedidoDet PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoDet, {partial: true}),
        },
      },
    })
    pedidoDet: PedidoDet,
    @param.where(PedidoDet) where?: Where<PedidoDet>,
  ): Promise<Count> {
    return this.pedidoDetRepository.updateAll(pedidoDet, where);
  }

  @get('/pedido-dets/{id}', {
    responses: {
      '200': {
        description: 'PedidoDet model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PedidoDet, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PedidoDet, {exclude: 'where'}) filter?: FilterExcludingWhere<PedidoDet>
  ): Promise<PedidoDet> {
    return this.pedidoDetRepository.findById(id, filter);
  }

  @patch('/pedido-dets/{id}', {
    responses: {
      '204': {
        description: 'PedidoDet PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PedidoDet, {partial: true}),
        },
      },
    })
    pedidoDet: PedidoDet,
  ): Promise<void> {
    await this.pedidoDetRepository.updateById(id, pedidoDet);
  }

  @put('/pedido-dets/{id}', {
    responses: {
      '204': {
        description: 'PedidoDet PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pedidoDet: PedidoDet,
  ): Promise<void> {
    await this.pedidoDetRepository.replaceById(id, pedidoDet);
  }

  @del('/pedido-dets/{id}', {
    responses: {
      '204': {
        description: 'PedidoDet DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidoDetRepository.deleteById(id);
  }
}
