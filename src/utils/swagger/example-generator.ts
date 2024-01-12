export function swaggerSuccessExample(data: any, example?: any) {
  return {
    properties: {
      data: {
        type: 'object',
        properties: data,
        example,
      },
    },
  };
}
