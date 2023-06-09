import {
	Button,
	FormLabel,
	InputAdornment,
	Stack,
	TextField,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./details.module.scss";

export function Portfolio(props) {
	return (
		<Stack key={props.key} className={styles.input_container}>
			<FormLabel className={styles.label}>Song Title</FormLabel>
			<TextField
				variant="filled"
				className={styles.input}
				inputProps={{
					className: styles.input_elem,
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position="end"
							style={{
								margin: "0",
								cursor: "default",
								background: "#666666",
							}}
						>
							<Button
								style={{ color: "#666666", padding: 0, minWidth: "0" }}
							></Button>
						</InputAdornment>
					),
				}}
				name="title"
				value={props.song.title}
				onChange={(e) => props.onChange(e, props.index)}
			></TextField>

			<FormLabel className={styles.label}>Song link</FormLabel>

			<TextField
				variant="filled"
				className={styles.input}
				inputProps={{
					className: styles.input_elem,
				}}
				InputProps={{
					endAdornment: (
						<InputAdornment
							position="end"
							style={{
								margin: "0",
								cursor: "default",
								background: "#666666",
							}}
						>
							<Button style={{ color: "#666666", padding: 0, minWidth: "0" }}>
								<DeleteIcon
									style={{
										color: "#ffffff",
										paddingLeft: "12px",
										minWidth: "0",
									}}
									className={styles.icon}
									onClick={() => props.onDelete(props.index)}
								/>
							</Button>
						</InputAdornment>
					),
				}}
				name="link"
				value={props.song.link}
				onChange={(e) => props.onChange(e, props.index)}
			></TextField>
			<hr className={styles.hr} />
		</Stack>
	);
}
