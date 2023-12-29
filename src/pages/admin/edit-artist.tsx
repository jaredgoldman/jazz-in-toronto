import ArtistForm from "~/components/Forms/Artist";
import RootLayout from "~/layouts/RootLayout";

export default function EditArtist() {
	return (
		<RootLayout pageTitle="Jazz in Toronto | Edit Artist">
			<ArtistForm />
		</RootLayout>
	);
}
