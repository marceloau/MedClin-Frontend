export class Constantes {

  // Inicio constantes dominio.
  static readonly DOMINIO_ESTADO_CIVIL = 'estado-civil';
  static readonly DOMINIO_ESTADO = 'estado';
  static readonly DOMINIO_TIPO_LOGRADOURO = 'tipo-logradouro';
  static readonly DOMINIO_USO_MEDICAMENTO = 'uso-medicamento';
  // Fim constantes dominio.

  // Inicio códigos de error retorno servico
  static readonly ERRO_CONFLITO = 409;
  static readonly ERRO_NOT_FOUND = 404;
  static readonly ERRO_INTERNAL_SERVER = 500;
  static readonly FORMATO_DATA_BACKEND = 'yyyy-MM-dd HH:mm:ss zzzz';
  static readonly FORMATO_DATA_BACKEND_DATE = 'yyyy-MM-dd';
  static readonly FORMATO_TIME_FRONTEND = 'h:mm';
  static readonly FORMATO_DATA_FRONTEND = 'yyyy-MM-dd';
  static readonly FORMATO_DATA_FRONTEND_PADRAO = 'dd/MM/yyyy';
  static readonly FORMATO_DATA_FRONTEND_COMBO = 'yyyy-MM-ddTHH:mm:ss';
  // Fim códigos de error retorno servico

  // inicio códigos de status da consulta
  static readonly STATUS_CONSULTA_ABERTA = 1;
  static readonly STATUS_CONSULTA_CONFIRMADA = 2;
  static readonly STATUS_CONSULTA_AGUARDANDO_ATENDIMENTO = 3;
  static readonly STATUS_CONSULTA_EM_ATENDIMENTO = 4;
  static readonly STATUS_CONSULTA_FINALIZADA = 5;
  static readonly STATUS_CONSULTA_CANCELADA = 6;
  // Fim códigos de status da consulta

}
