//local components
import { api } from "~/utils/api";
import { Artist } from "~/types/data";
//modules
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Table, Button } from "@radix-ui/themes";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export function ArtistsTable() {
	//fetch data and set loading state
	const { data } = api.artist.getAll.useQuery();
	const router = useRouter();

	const handleEditClick = useCallback(
		async (artist: Artist) => {
			const params = new URLSearchParams();
			params.set("id", artist.id);
			await router.push(
				{
					pathname: "/admin/edit-artist",
					query: params.toString(),
				},
				undefined,
				{ shallow: true },
			);
		},
		[router],
	);

	const columns = useMemo<ColumnDef<Artist>[]>(
		() => [
			{
				accessorKey: "name",
				cell: (info) => info.getValue(),
				header: () => <span>Name</span>,
			},
			{
				accessorKey: "genre",
				cell: (info) => info.getValue(),
				header: () => <span>Genre</span>,
			},
			{
				accessorKey: "website",
				cell: (info) => info.getValue(),
				header: () => <span>Website</span>,
			},
			{
				accessorKey: "instagramHandle",
				cell: (info) => info.getValue(),
				header: () => <span>Instagram Handle</span>,
			},
			{
				accessorKey: "active",
				cell: (info) => info.renderValue()?.toString(),
				header: () => <span>Active</span>,
			},
			{
				accessorKey: "featured",
				cell: (info) => info.renderValue()?.toString(),
				header: () => <span>Featured</span>,
			},
			{
				id: "edit",
				cell: ({ row }) => {
					return (
						<>
							<Button onClick={() => handleEditClick(row.original)}>
								Edit
							</Button>
						</>
					);
				},
				header: () => <span>Edit</span>,
			},
		],
		[handleEditClick],
	);

	const table = useReactTable<Artist>({
		data: data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div>
				<Table.Root variant="surface">
					<Table.Header>
						{table.getHeaderGroups().map((headerGroup) => (
							<Table.Row key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<Table.RowHeaderCell key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
											  )}
									</Table.RowHeaderCell>
								))}
							</Table.Row>
						))}
					</Table.Header>
					<Table.Body>
						{table.getRowModel().rows.map((row) => (
							<Table.Row key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<Table.Cell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</div>
		</>
	);
}
