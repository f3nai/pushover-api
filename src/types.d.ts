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

export interface SendingMessage {
    // Required
    token?: string
    user?: string
    message: string
    // Optional stuff
    attachment?: BinaryData
    attachment_base64?: any // base64 i couldnt find the type for it..
    attachment_type?: any // same thing but idk the type
    device?: string
    html?: boolean
    priority?: number | Priority | PriorityEnum
    sound?: string
    timestamp?: any // unix timestamp
    title?: string
    ttl?: number // time to live
    url?: string
    url_title?: string
    // Emergency alert
    retry?: number
    expire?: number
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