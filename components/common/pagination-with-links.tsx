'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ReactNode, useCallback } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface PaginationWithLinksProps {
  limitSelectOptions?: {
    LimitSearchParam?: string;
    LimitOptions: number[];
  };
  totalCount: number;
  limit: number;
  page: number;
  pageSearchParam?: string;
}

export function PaginationWithLinks({
  limitSelectOptions,
  limit,
  totalCount,
  page,
  pageSearchParam,
}: PaginationWithLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPageCount = Math.ceil(totalCount / limit);

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || 'page';
      if (!searchParams) return `${pathname}?${key}=${newPage}`;
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [pageSearchParam, searchParams, pathname]
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = limitSelectOptions?.LimitSearchParam || 'limit';
      const newSearchParams = new URLSearchParams(searchParams || undefined);
      newSearchParams.set(key, String(newPageSize));
      newSearchParams.delete(pageSearchParam || 'page');
      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
    [limitSelectOptions?.LimitSearchParam, searchParams, pageSearchParam, router, pathname]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink href={buildLink(1)} isActive={page === 1}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink href={buildLink(i)} isActive={page === i}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 3) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink href={buildLink(totalPageCount)} isActive={page === totalPageCount}>
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {limitSelectOptions && (
        <div className="flex flex-col gap-4 flex-1">
          <SelectLimitPerPage
            options={limitSelectOptions.LimitOptions}
            setLimit={navToPageSize}
            limit={limit}
          />
        </div>
      )}
      <Pagination className={cn({ 'md:justify-end': limitSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href={buildLink(Math.min(page + 1, totalPageCount))}
              aria-disabled={page === totalPageCount}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={page === totalPageCount ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function SelectLimitPerPage({
  options,
  setLimit,
  limit,
}: {
  options: number[];
  setLimit: (newSize: number) => void;
  limit: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">Products per page</span>

      <Select value={String(limit)} onValueChange={(value) => setLimit(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder="Select Product Limit">{String(limit)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
