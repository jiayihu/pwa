export type RestError = {
  code: 'BadArgument' | 'InvalidJSON';
  message: string;
  details?: Array<RestError>;
};

export function isRestError(x: unknown): x is RestError {
  return (x as RestError).code !== undefined && (x as RestError).message !== undefined;
}
