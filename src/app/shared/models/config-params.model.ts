import { NameValue } from "./name-value.model";

export interface ConfigParams {
    page?: number,
    numberOfRegisters?: number,
    fullTextSearch?: string,
    field?: NameValue,
}