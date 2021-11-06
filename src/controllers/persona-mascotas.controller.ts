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
  Mascotas, Persona
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaMascotasController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Persona has many Mascotas',
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
    return this.personaRepository.mascotas(id).find(filter);
  }

  @post('/personas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascotas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {
            title: 'NewMascotasInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) mascotas: Omit<Mascotas, 'Id'>,
  ): Promise<Mascotas> {
    return this.personaRepository.mascotas(id).create(mascotas);
  }

  @patch('/personas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Persona.Mascotas PATCH success count',
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
    return this.personaRepository.mascotas(id).patch(mascotas, where);
  }

  @del('/personas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Persona.Mascotas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.personaRepository.mascotas(id).delete(where);
  }
}
