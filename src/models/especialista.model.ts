import {Entity, hasMany, model, property} from '@loopback/repository';
import {Mascotas} from './mascotas.model';

@model()
export class Especialista extends Entity {
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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Especialidad: string;

  @property({
    type: 'string',
  })
  mascotasId?: string;

  @hasMany(() => Mascotas)
  mascotas: Mascotas[];

  constructor(data?: Partial<Especialista>) {
    super(data);
  }
}

export interface EspecialistaRelations {
  // describe navigational properties here
}

export type EspecialistaWithRelations = Especialista & EspecialistaRelations;
