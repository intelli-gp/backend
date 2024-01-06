export function swaggerSuccessExample(data: any) {
  return {
    properties: {
      data: {
        type: 'object',
        properties: data,
      },
    },
  };
}
