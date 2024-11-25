export interface UpdateConfigRequest {
    key: string;
    value: string;
}

export interface ConfigRes {
    key?: string;
    [property: string]: any;
}
