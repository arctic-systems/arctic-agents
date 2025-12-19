# API

Base URL: http://localhost:8080

All responses are JSON.

## GET /health

Response 200:

```json
{ "ok": true }
```

## GET /lessons

Query parameters:

- limit (optional, default 18)

Example:

```bash
curl "http://localhost:8080/lessons?limit=10"
```

Response 200:

```json
{
  "lessons": [
    {
      "id": "string",
      "title": "string",
      "body": "string",
      "tags": ["string"],
      "createdAt": 0
    }
  ]
}
```

## POST /submitLesson

Purpose:
Submit a lesson into the library.

Request body:

```json
{
  "title": "string",
  "body": "string",
  "tags": ["string"]
}
```

Example:

```bash
curl -X POST "http://localhost:8080/submitLesson" ^
  -H "content-type: application/json" ^
  -d "{\"title\":\"Demo\",\"body\":\"A short lesson.\",\"tags\":[\"demo\"]}"
```

Response 200:

```json
{ "ok": true, "id": "string" }
```

Errors:

- 400 with { "error": "string" }
- 405 with { "error": "use POST" }

## POST /moderate

Purpose:
Run the moderation gate contract.

Request body for ask mode:

```json
{ "mode": "ask", "text": "string" }
```

Request body for teach mode:

```json
{ "mode": "teach", "title": "string", "body": "string", "tags": ["string"] }
```

Response 200:

```json
{ "ok": true, "reason": "", "isQuestion": true }
```

Notes:

- ok indicates whether the content is allowed
- isQuestion can be false for ask mode when the input is not a question

## POST /inference

Purpose:
Produce an answer grounded in retrieved lessons.

Request body:

```json
{
  "question": "string",
  "lessons": [
    {
      "id": "string",
      "title": "string",
      "body": "string",
      "tags": ["string"],
      "createdAt": 0
    }
  ]
}
```

Notes:

- lessons is optional. If omitted, the server may pull recent lessons from storage.
- the server may cap the number of lessons used.

Example:

```bash
curl -X POST "http://localhost:8080/inference" ^
  -H "content-type: application/json" ^
  -d "{\"question\":\"What do we know?\",\"lessons\":[]}"
```

Response 200:

```json
{
  "answer": "string",
  "citations": [{ "lessonId": "string", "lessonTitle": "string" }],
  "confidence": 0
}
```

Errors:

- 400 with { "error": "string" }
- 405 with { "error": "use POST" }
