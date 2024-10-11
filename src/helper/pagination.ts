import { Repository, SelectQueryBuilder } from 'typeorm';

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export async function paginate<T>(
  repository: Repository<T>,
  queryBuilder: SelectQueryBuilder<T>,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginationResult<T>> {
  const [data, total] = await queryBuilder
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getManyAndCount();

  return {
    data,
    total,
    page,
    pageSize,
  };
}
