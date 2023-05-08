import { Configuration, OpenAIApi } from 'openai'
import { createReadStream } from 'fs'

import config from 'config'

class OpenAI {

  roles = {
    ASISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system'
  }

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    })
    this.openai = new OpenAIApi(configuration)
  }

  async chat(messages) {
    try {
      const responce = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages
      })
      return responce.data.choices[0].message
    } catch (error) {
      console.log('Error while gpt chat: ', error.message);
    }
  }

  async transcription(filepath) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filepath),
        'whisper-1'
      )

      return response.data.text
    } catch (error) {
      console.log('Error while transcription:', error.message);
    }
  }
}

export const openai = new OpenAI(config.get('OPENAI_KEY'))
