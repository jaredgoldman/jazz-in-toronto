import { DropdownMenu } from "@radix-ui/themes";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

type Props = {
	isFeatured: boolean;
	onToggleFeatured: () => void;
	onEdit: () => void;
	onDelete: () => void;
};

export function TableActionMenu({
	isFeatured,
	onToggleFeatured,
	onEdit,
	onDelete,
}: Props) {
	return (
		<>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<DotsVerticalIcon />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content size="2">
					<DropdownMenu.Item onClick={onEdit}>Edit</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item
						color={isFeatured ? undefined : "green"}
						onClick={() => {
							onToggleFeatured();
						}}
					>
						{isFeatured ? "Unfeature" : "Feature"}
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Approve</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item color="red" onClick={onDelete}>
						Delete
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</>
	);
}
