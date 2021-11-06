import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Especialista} from './especialista.model';
import {Persona} from './persona.model';

@model()
export class Mascotas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Raza: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => Especialista)
  especialistaId: string;

  constructor(data?: Partial<Mascotas>) {
    super(data);
  }
}

export interface MascotasRelations {
  // describe navigational properties here
}

export type MascotasWithRelations = Mascotas & MascotasRelations;
