export enum ErrorMessages {
  REQUIRED = 'Campo obrigatório',
  INVALID_VALUE = 'Valor inválido',
}

export const DynamicErrors = {
  minLength: (minLengthValue: number) =>
    `Este campo deve ter no mínimo ${minLengthValue} dígitos`,
  maxLength: (maxLengthValue: number) =>
    `Este campo deve ter no máximo ${maxLengthValue} dígitos`,
} as const