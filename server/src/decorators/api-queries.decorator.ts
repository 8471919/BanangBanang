import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiQueries = (
  requiredProperties: { name: string; description: string }[],
  nonRequiredProperties: { name: string; description: string }[],
) => {
  const required = requiredProperties.map((el) => {
    return ApiQuery({
      name: el.name,
      required: true,
      description: el.description,
    });
  });

  const nonRequired = nonRequiredProperties.map((el) => {
    return ApiQuery({
      name: el.name,
      required: false,
      description: el.description,
    });
  });

  return applyDecorators(...required, ...nonRequired);
};
