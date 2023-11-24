export interface ApiResponse {
    user: string
    errors: string[]
    status: number
    request: string
}

export type Priority = "LOWEST" | "LOW" | "NORMAL" | "HIGH" | "EMERGENCY"
export enum PriorityEnum {"LOWEST", "LOW" , "NORMAL" , "HIGH" , "EMERGENCY"}

export interface PushClientExtraConfig {
    emergency: {
        expire: number,
        retry: number
    }
}

export class PushClient{
    // Initialize class
    constructor({token: string, user: string})

    // Settings
    private settings: Object<string, string>
    private setupSuccess: boolean

    // functions definition

    // * Public
    protected static async send: (content: {title?: string, message: string, priority: Priority}, device?: string) => boolean
    // * Private
    private async setup: () => Promise<void>
}