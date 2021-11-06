import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Especialista, Mascotas
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasEspecialistaController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/especialista', {
    responses: {
      '200': {
        description: 'Especialista belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Especialista)},
          },
        },
      },
    },
  })
  async getEspecialista(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
  ): Promise<Especialista> {
    return this.mascotasRepository.especialista(id);
  }
}
