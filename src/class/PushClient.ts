/*

Author: F3NAI
Contributors: 

*/

import { Priority, ApiResponse, PushClientExtraConfig, PriorityEnum } from "../types"
import axios from "axios"
import * as api_urls from "../api.config.json"
import ConvertPriority from "../functions/Priority"

class PushClient {
    private settings = {
        "token": "",
        "user": "",
    }

    private config: PushClientExtraConfig = {
        emergency: {
            expire: 120, // in seconds
            retry: 30 // in seconds
        }
    }

    constructor(input: {token: string, user: string}, config?: PushClientExtraConfig) {
        const { token, user } = input

        if (!token) throw new Error("PushClient Error: Missing TOKEN parameter while initializing!")
        if (!user) throw new Error("PushClient Error: Missing USER parameter while initializing!")

        if (config) {
            this.config = config
        }

        this.settings = input
        this.setup()
    }

    private async setup(): Promise<void> {
        try {
            const response_1 = await axios.post(api_urls.VALIDATE, this.settings)
            const data: ApiResponse = await response_1.data

            if (response_1.status == 1) {
                return
            }
        } catch (err) {
            
            // ## if its not true;

            let ErrorMessage = "PushClient Error: FAILVALIDATION Server failed to validate your credentials: \n" + err

            throw new Error(ErrorMessage)
        }
    }

    async send(params: any): Promise<boolean> {
        let sending = params

        if (sending.priority) {
            sending.priority = ConvertPriority(sending.priority)
        }

        if (sending.priority == 2 && !sending.retry && !sending.expire) {
            // The api requires for us to add 'retry' and 'expire' parameters if its an emergency priority notification

            sending.retry = this.config.emergency.retry
            sending.expire = this.config.emergency.expire
        }

        try {
            const SendRequest = await axios.post(api_urls.PUSH_MSG, sending)
            const data: ApiResponse = await SendRequest.data
    
            if (data.status == 1) return true
            return false
            // ## If it returns something other than 1 (which is success) then we do these
        } catch (e) {
            let ErrorMessage = "PushClient Error: FAILREQSEND Request failed to send: \n" + e
    
            throw new Error(ErrorMessage) // Something went wrong!
        }
    }
}

export = PushClient