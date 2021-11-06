import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Mascotas,
  Persona
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasPersonaController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
  ): Promise<Persona> {
    return this.mascotasRepository.persona(id);
  }
}
