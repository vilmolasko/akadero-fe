"use client";

import { useState, useEffect, useMemo } from "react";
import * as api from "@/services";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActionButtons from "./action-buttons";
import DeleteConfirmDialog from "./delete-confirm-dialog";

import { toast } from "react-hot-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Eye } from "lucide-react";
import { fDateTime } from "@/utils/formatTime";
import { useRouter } from "@bprogress/next";

function StatusBadge({ status }) {
  const base = "px-2 py-1 text-xs font-medium rounded-full";
  const colors = {
    active: "bg-green-100 text-green-700 border border-green-300",
    inactive: "bg-gray-100 text-gray-700 border border-gray-300",
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    complete: "bg-blue-100 text-blue-700 border border-blue-300",
  };
  return (
    <span
      className={`${base} ${colors[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1) || "Unknown"}
    </span>
  );
}

export default function DataTable({
  resource, // e.g., 'categories'
  columns,
  emptyLabel = "No items found.",
  preview,
  getapiEndPoint,
  deleteEndPoint,
  byID,
  path,
  deleteOnly,
  isCopy,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // 🔹 Extract URL params
  const initialSearch = searchParams.get("search") || "";
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 5;

  // 🔹 Local States
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [deleteState, setDeleteState] = useState({
    open: false,
    id: null,
    loading: false,
  });

  // 🔹 Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  // 🔹 Build query string — remove default values
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedSearch.trim()) params.set("search", debouncedSearch);
    if (page > 1) params.set("page", String(page)); // ✅ only if > 1
    if (limit !== 5) params.set("limit", String(limit)); // ✅ only if ≠ 5

    return params.toString();
  }, [debouncedSearch, page, limit]);

  // 🔹 Instantly update URL without scroll
  useEffect(() => {
    const newUrl = queryString ? `?${queryString}` : "";
    router.replace(newUrl, { scroll: false });
  }, [queryString, router]);

  // 🔹 Fetch API data
  const { data, isFetching } = useQuery({
    queryKey: [resource, debouncedSearch, page, limit],
    queryFn: async () => {
      const qs = new URLSearchParams();
      if (debouncedSearch.trim()) qs.set("search", debouncedSearch);
      qs.set("page", String(page));
      qs.set("limit", String(limit));
      return await getapiEndPoint(qs.toString());
    },
    keepPreviousData: true,
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Something went wrong!"),
  });

  // 🔹 Extract API data
  const list = data?.data || [];
  const totalPages = data?.count || 1;

  async function confirmDelete() {
    if (!deleteState.id) return;

    setDeleteState((s) => ({ ...s, loading: true }));

    deleteEndPoint(deleteState.id).then(() => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: [resource] });
      setDeleteState({ open: false, id: null, loading: false });
    });
  }

  const { mutate: updateStatus, isPending: isUpdatingStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      return await api.updateOrganizersByAdmin({ id, status });
    },
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to update status"),
  });

  return (
    <div className="p-4 space-y-4">
      {/* 🔍 Search + Limit */}
      <div className="flex items-center justify-between gap-3">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-40 md:w-64"
        />

        <Select
          value={String(limit)}
          onValueChange={(v) => {
            setLimit(Number(v));
            setPage(1);
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20].map((opt) => (
              <SelectItem key={opt} value={String(opt)}>
                {opt} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* 🔹 Table */}
      <div className={cn("rounded-md border")}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => {
                return (
                  <TableHead key={col.key}>
                    <span>{col.header}</span>
                  </TableHead>
                );
              })}
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>Loading...</TableCell>
              </TableRow>
            ) : list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>{emptyLabel}</TableCell>
              </TableRow>
            ) : (
              list.map((row) => (
                <TableRow key={row._id}>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.key === "status" ? (
                        <StatusBadge status={row[col.key]} />
                      ) : col.key === "price" ? (
                        `$${Number(row[col.key] ?? 0).toLocaleString()}`
                      ) : col.key === "createdAt" ? (
                        fDateTime(row[col.key])
                      ) : col.cell ? (
                        col.cell(row)
                      ) : (
                        String(row[col.key] ?? "")
                      )}
                    </TableCell>
                  ))}

                  <TableCell>
                    {preview ? (
                      <>
                        {isCopy ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label="Edit"
                                  onClick={() => {
                                    navigator.clipboard.writeText(row.email);
                                    toast.success("Copied Email");
                                  }}
                                >
                                  <Copy className="size-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Select
                              value={row.status}
                              disabled={isUpdatingStatus}
                              onValueChange={(v) =>
                                updateStatus({ id: row._id, status: v })
                              } // ✅ pass id + status
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {["active", "inactive"].map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Edit"
                                    onClick={() => {
                                      router.push(
                                        `/${path}/${resource}/${row._id}`
                                      );
                                    }}
                                  >
                                    <Eye className="size-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Preview</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                      </>
                    ) : (
                      <ActionButtons
                        deleteOnly={deleteOnly}
                        onEdit={() =>
                          router.push(
                            `/${path}/${resource}/${byID ? row._id : row.slug}`
                          )
                        }
                        onDelete={() =>
                          setDeleteState({
                            open: true,
                            id: byID ? row._id : row.slug,
                            loading: false,
                          })
                        }
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* 🔹 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}
          >
            Prev
          </Button>
          <span>
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isFetching}
          >
            Next
          </Button>
        </div>
      </div>
      {/* 🔹 Delete Dialog */}
      <DeleteConfirmDialog
        open={deleteState.open}
        onOpenChange={(o) => setDeleteState((s) => ({ ...s, open: o }))}
        title="Delete item?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        loading={deleteState.loading}
      />
    </div>
  );
}
