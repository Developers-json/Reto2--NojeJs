import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Especialista,
  Mascotas
} from '../models';
import {EspecialistaRepository} from '../repositories';

export class EspecialistaMascotasController {
  constructor(
    @repository(EspecialistaRepository) protected especialistaRepository: EspecialistaRepository,
  ) { }

  @get('/especialistas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Especialista has many Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mascotas>,
  ): Promise<Mascotas[]> {
    return this.especialistaRepository.mascotas(id).find(filter);
  }

  @post('/especialistas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Especialista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascotas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Especialista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {
            title: 'NewMascotasInEspecialista',
            exclude: ['id'],
            optional: ['especialistaId']
          }),
        },
      },
    }) mascotas: Omit<Mascotas, 'id'>,
  ): Promise<Mascotas> {
    return this.especialistaRepository.mascotas(id).create(mascotas);
  }

  @patch('/especialistas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Especialista.Mascotas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {partial: true}),
        },
      },
    })
    mascotas: Partial<Mascotas>,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.especialistaRepository.mascotas(id).patch(mascotas, where);
  }

  @del('/especialistas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Especialista.Mascotas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.especialistaRepository.mascotas(id).delete(where);
  }
}
