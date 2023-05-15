export default function handler(request, response) {
  switch(request.method) {
    case 'GET':
      return response.status(200).json([{
          body: request.body,
          query: request.query,
          cookies: request.cookies,
          method: 'GET',
        }
      ]);
    case 'POST':
      return response.status(200).json([{
          body: request.body,
          query: request.query,
          cookies: request.cookies,
          method: 'POST',
        }
      ]);
    case 'PUT':
      return response.status(200).json([{
          body: request.body,
          query: request.query,
          cookies: request.cookies,
          method: 'PUT',
        }
      ]);
    case 'DELETE':
      return response.status(200).json([{
          body: request.body,
          query: request.query,
          cookies: request.cookies,
          method: 'DELETE',
        }
      ]);
    default:
      return response.status(200).json([{
          body: request.body,
          query: request.query,
          cookies: request.cookies,
          method: 'DEFAULT',
        }
      ]);
  }
}