import { useState, lazy, Suspense, useEffect } from "react";

import Loading from "../components/loading";
import useFetch from "../hooks/useFetch";
import { getTransaction } from "../actions/transaction";

const UserInformation = lazy(() => import("../components/user-information"));

const Transaction = () => {
  const {
    data: initialTransactions, // Rename 'data' menjadi 'initialTransactions'
    loading: initialLoading,
    error: initialError,
  } = useFetch(getTransaction, { limit: 5, offset: 0 });

  const [transactions, setTransactions] = useState(
    initialTransactions?.records || []
  );
  const [offset, setOffset] = useState(initialTransactions?.offset || 0);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(
    initialTransactions ? initialTransactions.records.length >= 5 : true
  );
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (initialTransactions?.records) {
      setTransactions(initialTransactions.records);
      setOffset(initialTransactions.offset || 0);
      setHasMore(initialTransactions.records.length >= limit);
    }
  }, [initialTransactions, limit]);

  // Fungsi untuk mem-fetch data tambahan
  const fetchMoreTransactions = async () => {
    try {
      setLoadingMore(true);
      const newTransactions = await getTransaction(limit, offset);
      setTransactions((prev) => [...prev, ...newTransactions.records]);
      setOffset((prev) => prev + newTransactions.records.length);
      setHasMore(newTransactions.records.length >= limit); // Cek apakah masih ada data
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formatter.format(new Date(date)) + " WIB";
  };

  // Tampilkan loading atau error jika ada
  if (initialLoading) {
    return <Loading />;
  }

  if (initialError) {
    console.error(initialError);
    return <div>Error: {initialError.message}</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-start my-10 mb">
      <div className="w-full max-w-[80%] flex flex-col space-y-6 gap-10">
        {/* UserProfile & Amount*/}
        <Suspense fallback={<Loading />}>
          <UserInformation />
        </Suspense>
        {/* Transaction List */}
        <div className="flex flex-col  w-full space-y-2">
          <p className="text-lg ">Semua Transaksi</p>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.invoice_number}
                className="flex justify-between items-center border py-3 px-6"
              >
                <div>
                  <p className="text-2xl font-bold">
                    {transaction.transaction_type === "PAYMENT" ? (
                      <span className="text-red-500">
                        - Rp {transaction.total_amount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-green-500">
                        + Rp {transaction.total_amount.toLocaleString()}
                      </span>
                    )}
                  </p>
                  <p className=" mt-2 text-sm text-gray-500">
                    {formatDate(transaction.created_on)}
                  </p>
                </div>
                <div>
                  <p className="text-md ">{transaction.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No transactions found</p>
          )}
          {hasMore && transactions.length > 0 && (
            <button
              onClick={fetchMoreTransactions}
              className="mt-4 text-red-500 bg-white py-2 px-4 rounded hover:text-red-700 disabled:opacity-50"
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
