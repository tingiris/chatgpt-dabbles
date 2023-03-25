Build a command line app using node.js and axios that posts to this endpoint https://api.openai.com/v1/chat/completions with the following body:

```json
{
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "Hello!"}]
}
```

My API key is stored as an environment variable named OPENAI_API_KEY and needs to be passed in the header as a bearer token.

The response will be in the following format:

```json
{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "\n\nHello there, how may I assist you today?",
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 12,
    "total_tokens": 21
  }
}
```
I need the value of the first content returned