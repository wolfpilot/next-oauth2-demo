export interface GenericError<T> {
  code: T
  message: string
}

export type GenericErrors<T extends string> = Record<T, GenericError<T>>
