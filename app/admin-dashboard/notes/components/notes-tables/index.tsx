import { DataTable } from "@/components/ui/table/data-table";
import { DataTableToolbar } from "@/components/ui/table/data-table-toolbar";
import { useDataTable } from "@/hooks/use-data-table";
import { ColumnDef } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs"

interface NotesTableProps<TData, TValue> {
    data: TData[];
    totalNotes: number;
    columns: ColumnDef<TData, TValue>[];
}
export const NotesTable = <TData, TValue>({
    data,
    totalNotes,
    columns
}: NotesTableProps<TData, TValue>) => {
    const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));

    const pageCount = Math.ceil(totalNotes / pageSize)

    const { table } = useDataTable({
        data,
        columns, // Notes colums
        pageCount: pageCount,
        shallow: false, // Setting to false triggers a network request with the updated querystring.
        debounceMs: 500
    })

    return (
        <DataTable table={table}>
            <DataTableToolbar table={table} />
        </DataTable>
    )
}