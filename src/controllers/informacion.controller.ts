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
import {InformarcionG} from '../models';
import {InformarcionGRepository} from '../repositories';

export class InformacionController {
  constructor(
    @repository(InformarcionGRepository)
    public informarcionGRepository : InformarcionGRepository,
  ) {}

  @post('/informarcion-gs', {
    responses: {
      '200': {
        description: 'InformarcionG model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformarcionG)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformarcionG, {
            title: 'NewInformarcionG',
            exclude: ['id'],
          }),
        },
      },
    })
    informarcionG: Omit<InformarcionG, 'id'>,
  ): Promise<InformarcionG> {
    return this.informarcionGRepository.create(informarcionG);
  }

  @get('/informarcion-gs/count', {
    responses: {
      '200': {
        description: 'InformarcionG model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(InformarcionG) where?: Where<InformarcionG>,
  ): Promise<Count> {
    return this.informarcionGRepository.count(where);
  }

  @get('/informarcion-gs', {
    responses: {
      '200': {
        description: 'Array of InformarcionG model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InformarcionG, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(InformarcionG) filter?: Filter<InformarcionG>,
  ): Promise<InformarcionG[]> {
    return this.informarcionGRepository.find(filter);
  }

  @patch('/informarcion-gs', {
    responses: {
      '200': {
        description: 'InformarcionG PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformarcionG, {partial: true}),
        },
      },
    })
    informarcionG: InformarcionG,
    @param.where(InformarcionG) where?: Where<InformarcionG>,
  ): Promise<Count> {
    return this.informarcionGRepository.updateAll(informarcionG, where);
  }

  @get('/informarcion-gs/{id}', {
    responses: {
      '200': {
        description: 'InformarcionG model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InformarcionG, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InformarcionG, {exclude: 'where'}) filter?: FilterExcludingWhere<InformarcionG>
  ): Promise<InformarcionG> {
    return this.informarcionGRepository.findById(id, filter);
  }

  @patch('/informarcion-gs/{id}', {
    responses: {
      '204': {
        description: 'InformarcionG PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformarcionG, {partial: true}),
        },
      },
    })
    informarcionG: InformarcionG,
  ): Promise<void> {
    await this.informarcionGRepository.updateById(id, informarcionG);
  }

  @put('/informarcion-gs/{id}', {
    responses: {
      '204': {
        description: 'InformarcionG PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() informarcionG: InformarcionG,
  ): Promise<void> {
    await this.informarcionGRepository.replaceById(id, informarcionG);
  }

  @del('/informarcion-gs/{id}', {
    responses: {
      '204': {
        description: 'InformarcionG DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.informarcionGRepository.deleteById(id);
  }
}
