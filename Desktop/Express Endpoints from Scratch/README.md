# Week 5 Day 1 Assignment — Kenyan Cities API

A small Express.js API with CRUD endpoints for an in-memory list of Kenyan cities.

## Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`.

## Endpoints

### `GET /api/cities`

Returns all cities. Supports optional query filters:

- `county` — filters by county (case-insensitive)
- `minPopulation` — returns cities with population above the value

```bash
curl http://localhost:3000/api/cities
```
```json
{ "success": true, "count": 8, "data": [ /* all 8 cities */ ] }
```

```bash
curl "http://localhost:3000/api/cities?county=mombasa"
```
```json
{
  "success": true,
  "count": 1,
  "data": [{ "id": 2, "name": "Mombasa", "county": "Mombasa", "population": 1208333 }]
}
```

```bash
curl "http://localhost:3000/api/cities?minPopulation=500000"
```
```json
{
  "success": true,
  "count": 4,
  "data": [
    { "id": 1, "name": "Nairobi", "county": "Nairobi", "population": 4397073 },
    { "id": 2, "name": "Mombasa", "county": "Mombasa", "population": 1208333 },
    { "id": 3, "name": "Kisumu", "county": "Kisumu", "population": 610082 },
    { "id": 4, "name": "Nakuru", "county": "Nakuru", "population": 570674 }
  ]
}
```

### `GET /api/cities/:id` (bonus)

Returns a single city by id.

```bash
curl http://localhost:3000/api/cities/1
```
```json
{ "success": true, "data": { "id": 1, "name": "Nairobi", "county": "Nairobi", "population": 4397073 } }
```

```bash
curl http://localhost:3000/api/cities/999
```
```json
{ "success": false, "error": "City with ID 999 not found" }
```

### `POST /api/cities`

Creates a new city. Requires `name` and `county` (non-empty strings) and `population` (positive number).

```bash
curl -X POST http://localhost:3000/api/cities \
  -H "Content-Type: application/json" \
  -d '{"name": "Nanyuki", "county": "Laikipia", "population": 63792}'
```
```json
{ "success": true, "data": { "id": 9, "name": "Nanyuki", "county": "Laikipia", "population": 63792 } }
```

```bash
curl -X POST http://localhost:3000/api/cities \
  -H "Content-Type: application/json" \
  -d '{"county": "Laikipia", "population": 63792}'
```
```json
{ "success": false, "error": "Name and county are required" }
```

### `PATCH /api/cities/:id` (bonus)

Partially updates a city — only provided fields are changed.

```bash
curl -X PATCH http://localhost:3000/api/cities/1 \
  -H "Content-Type: application/json" \
  -d '{"population": 4500000}'
```
```json
{ "success": true, "data": { "id": 1, "name": "Nairobi", "county": "Nairobi", "population": 4500000 } }
```

```bash
curl -X PATCH http://localhost:3000/api/cities/999 \
  -H "Content-Type: application/json" \
  -d '{"population": 4500000}'
```
```json
{ "success": false, "error": "City with ID 999 not found" }
```

### `DELETE /api/cities/:id`

Deletes a city by id.

```bash
curl -X DELETE http://localhost:3000/api/cities/3
```
```json
{
  "success": true,
  "message": "City deleted",
  "data": { "id": 3, "name": "Kisumu", "county": "Kisumu", "population": 610082 }
}
```

```bash
curl -X DELETE http://localhost:3000/api/cities/999
```
```json
{ "success": false, "error": "City with ID 999 not found" }
```

## AI Usage

Parts of this project were scaffolded with AI assistance (GitHub Copilot). AI-generated lines are marked with a comment explaining what they do.
