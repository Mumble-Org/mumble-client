import styles from "./details.module.scss";
import {
	Stack,
	InputAdornment,
	Button,
	TextField,
	FormLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function Portfolio(props) {
	return (
		<Stack key={props.key} className={styles.input_container}>
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
				value={props.link}
				onChange={(e) => props.onChange(e, props.index)}
			></TextField>
		</Stack>
	);
}
