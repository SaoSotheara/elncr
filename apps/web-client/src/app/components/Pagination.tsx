import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({
  totalItems,
  page = 1,
  itemsPerPage = 25,
}: {
  items: any[];
  totalItems: number;
  page?: number;
  itemsPerPage?: number;
}) => {
  const [scrollY, setScrollY] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY;
    }
    return null;
  });

  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  const router = useRouter();
  const pathName = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(
    urlSearchParams.get('page') ? Number(urlSearchParams.get('page')) : page
  );

  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const totalPageArray = new Array(totalPage).fill(null);

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', page.toString());
    const search = current.toString();
    const query = search ? `?${search}` : '';
    console.log(window.scrollY);
    setScrollY(window.scrollY);
    router.push(`${pathName}${query}`);
  };

  useEffect(() => {
    const persistentScroll = scrollY;
    if (persistentScroll === null) return;

    window.scrollTo({ top: Number(persistentScroll) });
  }, [currentPage, scrollY]);

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          {/* Previous button */}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={currentPage === 1}
              onClick={(event) => handlePageChange(event, currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {totalPageArray.map((value, index) => {
            return (
              <li key={index}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    currentPage === index + 1 ? 'bg-blue-100' : ''
                  }`}
                  onClick={(event) => handlePageChange(event, index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            );
          })}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={totalPage === currentPage}
              onClick={(event) => handlePageChange(event, currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Pagination;
