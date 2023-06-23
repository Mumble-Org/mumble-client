import { ImageResponse } from "@vercel/og";

export const config = {
	runtime: "edge",
};

const image = fetch(new URL("../../public/Logo.png", import.meta.url)).then(
	(res) => res.arrayBuffer()
);

// const font = fetch(
// 	new URL(
// 		"../../Space_Grotesk/SpaceGrotesk-VariableFont_wght.ttf",
// 		import.meta.url
// 	)
// ).then((res) => res.arrayBuffer());

export default async function handler() {
	const imageData = await image;
	// const fontData = await font;

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					background: "#b2b2b2",
					width: "100%",
					height: "100%",
					justifyContent: "space-between",
					alignItems: "center",
					gap: "5%",
					fontFamily: "Helvetica",
				}}
			>
				<img width="50%" height="100%" src={imageData} alt="Mumble" />

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						fontSize: 52,
						alignItems: "center",
						justifyContent: "center",
						paddingRight: 24,
						paddingLeft: 24,
					}}
				>
					<h1 style={{ color: "febfff" }}>Mumble</h1>
					<p style={{ color: "febfff" }}>Marketplace for beats</p>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			// fonts: [
			// 	{
			// 		name: "Typewriter",
			// 		data: fontData,
			// 		style: "normal",
			// 		weight: 700,
			// 	},
			// ],
		}
	);
}
