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
  response,
} from '@loopback/rest';
import {Especialista} from '../models';
import {EspecialistaRepository} from '../repositories';

export class EspecialistaController {
  constructor(
    @repository(EspecialistaRepository)
    public especialistaRepository : EspecialistaRepository,
  ) {}

  @post('/especialistas')
  @response(200, {
    description: 'Especialista model instance',
    content: {'application/json': {schema: getModelSchemaRef(Especialista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especialista, {
            title: 'NewEspecialista',
            exclude: ['id'],
          }),
        },
      },
    })
    especialista: Omit<Especialista, 'id'>,
  ): Promise<Especialista> {
    return this.especialistaRepository.create(especialista);
  }

  @get('/especialistas/count')
  @response(200, {
    description: 'Especialista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Especialista) where?: Where<Especialista>,
  ): Promise<Count> {
    return this.especialistaRepository.count(where);
  }

  @get('/especialistas')
  @response(200, {
    description: 'Array of Especialista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Especialista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Especialista) filter?: Filter<Especialista>,
  ): Promise<Especialista[]> {
    return this.especialistaRepository.find(filter);
  }

  @patch('/especialistas')
  @response(200, {
    description: 'Especialista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especialista, {partial: true}),
        },
      },
    })
    especialista: Especialista,
    @param.where(Especialista) where?: Where<Especialista>,
  ): Promise<Count> {
    return this.especialistaRepository.updateAll(especialista, where);
  }

  @get('/especialistas/{id}')
  @response(200, {
    description: 'Especialista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Especialista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Especialista, {exclude: 'where'}) filter?: FilterExcludingWhere<Especialista>
  ): Promise<Especialista> {
    return this.especialistaRepository.findById(id, filter);
  }

  @patch('/especialistas/{id}')
  @response(204, {
    description: 'Especialista PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Especialista, {partial: true}),
        },
      },
    })
    especialista: Especialista,
  ): Promise<void> {
    await this.especialistaRepository.updateById(id, especialista);
  }

  @put('/especialistas/{id}')
  @response(204, {
    description: 'Especialista PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() especialista: Especialista,
  ): Promise<void> {
    await this.especialistaRepository.replaceById(id, especialista);
  }

  @del('/especialistas/{id}')
  @response(204, {
    description: 'Especialista DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.especialistaRepository.deleteById(id);
  }
}
